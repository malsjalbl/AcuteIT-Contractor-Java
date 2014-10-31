package uk.co.acuteit.app.repository.core;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.co.acuteit.app.entity.contract.ContractActivityLogTypeEntity;

public interface IContractStatusRepository extends JpaRepository<ContractActivityLogTypeEntity, Long>  {

}
