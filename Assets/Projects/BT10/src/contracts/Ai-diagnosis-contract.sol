// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AIDiagnosisContract {
    enum RiskLevel { LOW, MEDIUM, HIGH }

    struct DiagnosisResult {
        uint256 timestamp;
        address patient;
        RiskLevel risk;
        string details;
    }

    mapping(address => DiagnosisResult[]) public patientDiagnoses;

    event Diagnosed(
        address indexed patient,
        uint256 timestamp,
        RiskLevel risk,
        string details
    );

    
    function diagnose(uint256 bmi, uint256 age, uint256 glucose) public returns (RiskLevel, string memory) {
        RiskLevel risk;
        string memory details;

        if (glucose > 140) {
            risk = RiskLevel.HIGH;
            details = "High risk due to elevated glucose levels.";
        } else if (bmi > 30 && age > 45) {
            risk = RiskLevel.MEDIUM;
            details = "Medium risk due to high BMI and age.";
        } else {
            risk = RiskLevel.LOW;
            details = "Low risk based on provided metrics.";
        }
        
        patientDiagnoses[msg.sender].push(DiagnosisResult({
            timestamp: block.timestamp,
            patient: msg.sender,
            risk: risk,
            details: details
        }));

        emit Diagnosed(msg.sender, block.timestamp, risk, details);

        return (risk, details);
    }

   
    function getDiagnosesForPatient(address patient) public view returns (DiagnosisResult[] memory) {
        return patientDiagnoses[patient];
    }
}
