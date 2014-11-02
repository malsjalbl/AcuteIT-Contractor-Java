package uk.co.acuteit.app.tax.services;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.co.acuteit.app.tax.entities.TaxYear;

public interface ITaxYearRepository extends JpaRepository<TaxYear, Long> {

}
