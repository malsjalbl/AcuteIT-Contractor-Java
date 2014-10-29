package uk.co.acuteit.app.repository.core;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.co.acuteit.app.entity.tax.TaxYear;

public interface ITaxYearRepository extends JpaRepository<TaxYear, Long> {

}
