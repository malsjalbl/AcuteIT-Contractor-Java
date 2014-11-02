package uk.co.acuteit.app.main.services;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.co.acuteit.app.main.entities.Location;

public interface ILocationRepository extends JpaRepository<Location, Long> {

}
