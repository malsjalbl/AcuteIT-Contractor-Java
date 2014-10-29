package uk.co.acuteit.app.repository.core;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.co.acuteit.app.entity.company.Company;

public interface ICompanyRepository extends JpaRepository<Company, Long> {

}
