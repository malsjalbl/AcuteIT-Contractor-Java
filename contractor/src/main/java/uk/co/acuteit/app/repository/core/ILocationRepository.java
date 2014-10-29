package uk.co.acuteit.app.repository.core;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.co.acuteit.app.entity.location.Location;

public interface ILocationRepository extends JpaRepository<Location, Long> {

}
