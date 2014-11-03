package uk.co.acuteit.app.mileage.services;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.co.acuteit.app.mileage.entities.Route;

public interface IRouteRepository extends JpaRepository<Route, Long> {

}
