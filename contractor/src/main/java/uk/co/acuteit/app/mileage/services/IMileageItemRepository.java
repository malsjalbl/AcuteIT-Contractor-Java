package uk.co.acuteit.app.mileage.services;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.co.acuteit.app.mileage.entities.MileageItem;

public interface IMileageItemRepository extends JpaRepository<MileageItem, Long> {

}
