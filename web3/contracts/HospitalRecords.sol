//SPDX-License-Identifier:MIT

pragma solidity ^0.8.17;

contract HospitalRecords {
    uint256 public recordNumber = 0;
    mapping(uint => bool) public isDeleted;

    struct Record {
        uint recordId;
        uint timestamp;
        string name;
        uint age;
        string gender;
        string bloodType;
        string allergies;
        string diagnosis;
        string treatment;
    }
    
    mapping(uint => Record) public records;

    event HospitalRecordStatus(
        uint recordId,
        string status,
        uint timestamp,
        string name,
        uint age,
        string gender,
        string bloodType,
        string allergies,
        string diagnosis,
        string treatment
    );

    function addRecord(
        string memory _name,
        uint _age,
        string memory _gender,
        string memory _bloodType,
        string memory _allergies,
        string memory _diagnosis,
        string memory _treatment
    ) public {
        Record storage record = records[recordNumber];

        record.name = _name;
        record.age = _age;
        record.gender = _gender;
        record.bloodType = _bloodType;
        record.allergies = _allergies;
        record.diagnosis = _diagnosis;
        record.treatment = _treatment;

        recordNumber++;
        
        emit HospitalRecordStatus(
            recordNumber,
            "Record created",
            block.timestamp,
            _name,
            _age,
            _gender,
            _bloodType,
            _allergies,
            _diagnosis,
            _treatment
        );
    }

    function updateRecord(
        uint _recordId,
        string memory _name,
        uint _age,
        string memory _gender,
        string memory _bloodType,
        string memory _allergies,
        string memory _diagnosis,
        string memory _treatment
    ) public {
        require(!isDeleted[_recordId], "The record is already deleted");
        Record storage record = records[_recordId];

        record.name = _name;
        record.age = _age;
        record.gender = _gender;
        record.bloodType = _bloodType;
        record.allergies = _allergies;
        record.diagnosis = _diagnosis;
        record.treatment = _treatment;

        emit HospitalRecordStatus(
            _recordId,
            "Record updated",
            block.timestamp,
            _name,
            _age,
            _gender,
            _bloodType,
            _allergies,
            _diagnosis,
            _treatment
        );
    }

    function deleteRecord(uint _recordId) public {
        require(!isDeleted[_recordId], "The record is already deleted");
        
        Record storage record = records[_recordId];
        isDeleted[_recordId] = true;
        recordNumber--;

        emit HospitalRecordStatus(
            record.recordId,
            "Record deleted",
            block.timestamp,
            record.name,
            record.age,
            record.gender,
            record.bloodType,
            record.allergies,
            record.diagnosis,
            record.treatment
        );
    }

    function getRecord() public view returns (Record[] memory)
    {
        uint count = 0;
        for (uint i = 0; i < recordNumber; i++) {
            if (!isDeleted[i]) {
                count++;
            }
        }

        Record[] memory record = new Record[](count);
        uint index = 0;

        for (uint i = 0; i < recordNumber; i++) {
            if (!isDeleted[i]) {
                record[index] = records[i];
                index++;
            }
        }
        return record;
    }

    function getRecordNumber() public view returns (uint) {
        return recordNumber;
    }

    function getTimeStamp(uint _recordId) public view returns (uint) {
        require(!isDeleted[_recordId], "The record is already deleted");
        return records[_recordId].timestamp;
    }

    function getName(uint _recordId) public view returns (string memory) {
        require(!isDeleted[_recordId], "The record is already deleted");
        return records[_recordId].name;
    }

    function getAge(uint _recordId) public view returns (uint) {
        require(!isDeleted[_recordId], "The record is already deleted");
        return records[_recordId].age;
    }

    function getGender(uint _recordId) public view returns (string memory) {
        require(!isDeleted[_recordId], "The record is already deleted");
        return records[_recordId].gender;
    }

    function getBloodType(uint _recordId) public view returns (string memory) {
        require(!isDeleted[_recordId], "The record is already deleted");
        return records[_recordId].bloodType;
    }

    function getAllergies(uint _recordId) public view returns (string memory) {
        require(!isDeleted[_recordId], "The record is already deleted");
        return records[_recordId].allergies;
    }

    function getDiagnosis(uint _recordId) public view returns (string memory) {
        require(!isDeleted[_recordId], "The record is already deleted");
        return records[_recordId].diagnosis;
    }

    function getTreatment(uint _recordId) public view returns (string memory) {
        require(!isDeleted[_recordId], "The record is already deleted");
        return records[_recordId].treatment;
    }

    function getDeleted(uint256 _recordId) public view returns (bool) {
        return isDeleted[_recordId];
    }
}