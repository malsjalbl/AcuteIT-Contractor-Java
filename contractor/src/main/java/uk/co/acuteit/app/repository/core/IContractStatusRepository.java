package uk.co.acuteit.app.repository.core;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.co.acuteit.app.entity.contract.ContractActivityType;

public interface IContractStatusRepository extends JpaRepository<ContractActivityType, Long>  {

}
