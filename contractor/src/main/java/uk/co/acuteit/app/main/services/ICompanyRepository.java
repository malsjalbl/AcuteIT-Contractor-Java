package uk.co.acuteit.app.main.services;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.co.acuteit.app.main.entities.Company;

public interface ICompanyRepository extends JpaRepository<Company, Long> {

}
