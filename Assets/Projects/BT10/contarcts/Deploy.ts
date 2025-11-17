import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy AIDiagnosisContract
  const aiDiagnosis = await ethers.deployContract("AIDiagnosisContract");
  await aiDiagnosis.waitForDeployment();
  const aiDiagnosisAddress = await aiDiagnosis.getAddress();
  console.log(`AIDiagnosisContract deployed to: ${aiDiagnosisAddress}`);

  // Deploy EHRControlContract
  const ehrControl = await ethers.deployContract("EHRControlContract");
  await ehrControl.waitForDeployment();
  const ehrControlAddress = await ehrControl.getAddress();
  console.log(`EHRControlContract deployed to: ${ehrControlAddress}`);

  // Deploy AuditLogContract
  const auditLog = await ethers.deployContract("AuditLogContract");
  await auditLog.waitForDeployment();
  const auditLogAddress = await auditLog.getAddress();
  console.log(`AuditLogContract deployed to: ${auditLogAddress}`);
  
  // Deploy GasPricePredictionContract
  const gasPricePrediction = await ethers.deployContract("GasPricePredictionContract");
  await gasPricePrediction.waitForDeployment();
  const gasPricePredictionAddress = await gasPricePrediction.getAddress();
  console.log(`GasPricePredictionContract deployed to: ${gasPricePredictionAddress}`);

  // --- Auto-update .env file ---
  const envFilePath = path.resolve(__dirname, '../.env');
  let envFileContent = "";

  if (fs.existsSync(envFilePath)) {
    envFileContent = fs.readFileSync(envFilePath, "utf8");
  }

  const updates = {
    NEXT_PUBLIC_AI_DIAGNOSIS_CONTRACT_ADDRESS: aiDiagnosisAddress,
    NEXT_PUBLIC_EHR_CONTRACT_ADDRESS: ehrControlAddress,
    NEXT_PUBLIC_AUDIT_LOG_CONTRACT_ADDRESS: auditLogAddress,
    NEXT_PUBLIC_GAS_PRICE_PREDICTION_CONTRACT_ADDRESS: gasPricePredictionAddress,
  };

  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}=.*$`, "m");
    if (regex.test(envFileContent)) {
      envFileContent = envFileContent.replace(regex, `${key}="${value}"`);
    } else {
      envFileContent += `\n${key}="${value}"`;
    }
  }

  fs.writeFileSync(envFilePath, envFileContent.trim() + '\n');
  console.log("\n✅ Successfully updated .env file with new contract addresses.");


  console.log("\nDeployment complete!");
  console.log("You can now interact with the contracts on the network.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
