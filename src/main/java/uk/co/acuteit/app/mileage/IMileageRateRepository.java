package uk.co.acuteit.app.mileage;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IMileageRateRepository extends JpaRepository<TaxYearMileageRateLineItem, Long> {

}
