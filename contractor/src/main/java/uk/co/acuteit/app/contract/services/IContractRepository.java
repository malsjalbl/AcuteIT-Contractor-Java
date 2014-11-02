package uk.co.acuteit.app.contract.services;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.co.acuteit.app.contract.entities.ContractEntity;

public interface IContractRepository extends JpaRepository<ContractEntity, Long> {

}
