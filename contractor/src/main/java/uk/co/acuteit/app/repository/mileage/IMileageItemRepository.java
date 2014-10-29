package uk.co.acuteit.app.repository.mileage;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.co.acuteit.app.entity.mileage.MileageItem;

public interface IMileageItemRepository extends JpaRepository<MileageItem, Long> {

}
