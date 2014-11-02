package uk.co.acuteit.app.mileage.services;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.co.acuteit.app.mileage.entities.TaxYearMileageRateLineItem;

public interface IMileageRateRepository extends JpaRepository<TaxYearMileageRateLineItem, Long> {

}
