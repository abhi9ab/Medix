import hre from "hardhat";

async function main() {
    const HospitalRecordsInstance = await hre.ethers.getContractFactory("HospitalRecords");
    const contract = await HospitalRecordsInstance.deploy();
    await contract.waitForDeployment();

    console.log("Contract deployed to: ", await contract.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });