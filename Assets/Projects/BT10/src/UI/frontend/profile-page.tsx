
'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FileText, Download, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuditLogContract } from '@/hooks/use-audit-log-contract';
import type { AuditEvent } from '@/hooks/use-audit-log-contract';
import { useAIDiagnosisContract } from '@/hooks/use-ai-diagnosis-contract';


const uploadedFiles = [
  {
    name: 'Blood Test Results - Jan 2024',
    date: '2024-01-15',
    size: '1.2 MB',
  },
  {
    name: 'Cardiology Report - Dec 2023',
    date: '2023-12-20',
    size: '850 KB',
  },
  {
    name: 'X-Ray Scan - Nov 2023',
    date: '2023-11-05',
    size: '4.5 MB',
  },
  {
    name: 'Full Medical History',
    date: '2023-10-01',
    size: '12.3 MB',
  },
];


export default function ProfilePage() {
    const { events, loading: auditLoading, fetchAuditEvents } = useAuditLogContract();
    const { diagnosis, loading: diagnosisLoading, getDiagnosis } = useAIDiagnosisContract();

    useEffect(() => {
        fetchAuditEvents();
        getDiagnosis();
    }, [fetchAuditEvents, getDiagnosis]);

    const getActionBadgeVariant = (action: string) => {
        if (action.includes('Revoked')) return 'destructive';
        if (action.includes('Granted')) return 'default';
        return 'secondary';
    }

    const getRiskScoreCategory = (score: number) => {
        if (score <= 30) return { text: 'Low', color: 'text-primary' };
        if (score <= 60) return { text: 'Moderate', color: 'text-yellow-500' };
        if (score <= 85) return { text: 'High', color: 'text-orange-500' };
        return { text: 'Very High', color: 'text-destructive' };
    }

    const healthStatus = diagnosis ? getRiskScoreCategory(diagnosis.riskScore) : { text: 'N/A', color: 'text-muted-foreground'};


  return (
    <main className="flex-1 w-full p-4 md:p-8 space-y-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Overall Health Status Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Overall Health Status</CardTitle>
            <CardDescription>A summary of your current health.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {diagnosisLoading ? (
                 <div className="flex items-center justify-center p-6">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground"/>
                </div>
            ) : (
                <>
                <div className="flex items-center justify-center p-6 bg-gradient-to-br from-primary/10 to-transparent rounded-lg">
                    <div className="text-center">
                        <ShieldCheck className={`h-16 w-16 mx-auto mb-2 ${healthStatus.color}`} />
                        <p className={`text-2xl font-bold ${healthStatus.color}`}>{healthStatus.text}</p>
                        <p className="text-sm text-muted-foreground">
                            {diagnosis ? `Last updated: ${diagnosis.timestamp}` : 'No on-chain diagnosis found'}
                        </p>
                    </div>
                </div>
                <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">AI Risk Assessment:</span>
                    <span className={`font-semibold ${healthStatus.color}`}>{healthStatus.text} Risk</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">On-chain Risk Score:</span>
                    <span className="font-semibold">{diagnosis ? diagnosis.riskScore : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Diagnosis Notes:</span>
                    <span className="font-semibold text-right max-w-[60%] truncate" title={diagnosis?.diagnosisData || 'N/A'}>
                        {diagnosis ? diagnosis.diagnosisData : 'N/A'}
                    </span>
                </div>
                </div>
                </>
            )}
          </CardContent>
        </Card>

        {/* Uploaded Files Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Uploaded Medical Files</CardTitle>
            <CardDescription>Your encrypted medical documents stored securely.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploadedFiles.map((file) => (
                  <TableRow key={file.name}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      {file.name}
                    </TableCell>
                    <TableCell>{file.date}</TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Access History Card */}
      <Card>
        <CardHeader>
          <CardTitle>EHR Access History</CardTitle>
          <CardDescription>Immutable log of all access to your medical records.</CardDescription>
        </CardHeader>
        <CardContent>
          {auditLoading ? (
             <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground"/>
                <span className="ml-4 text-muted-foreground">Fetching on-chain audit trail...</span>
            </div>
          ) : (
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Initiator</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-right">Date & Time</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {events.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                            No on-chain audit history found.
                        </TableCell>
                    </TableRow>
                ) : (
                    events.map((log) => (
                    <TableRow key={log.id}>
                        <TableCell className="font-medium flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${log.initiator}`} alt={log.initiator} />
                            <AvatarFallback>{log.initiator.substring(2,4)}</AvatarFallback>
                            </Avatar>
                            <span title={log.initiator}>{`${log.initiator.slice(0,6)}...${log.initiator.slice(-4)}`}</span>
                        </TableCell>
                        <TableCell>
                            <Badge variant={getActionBadgeVariant(log.action)}>{log.action}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-xs">{log.details}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{log.timestamp}</TableCell>
                    </TableRow>
                )))}
                </TableBody>
          </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

    
