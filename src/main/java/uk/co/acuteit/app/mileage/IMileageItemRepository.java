package uk.co.acuteit.app.mileage;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IMileageItemRepository extends JpaRepository<MileageItem, Long> {

}
