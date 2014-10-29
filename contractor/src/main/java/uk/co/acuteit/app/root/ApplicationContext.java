package uk.co.acuteit.app.root;

import java.util.Properties;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.hibernate.ejb.HibernatePersistence;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.core.env.Environment;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

import uk.co.acuteit.app.service.implementations.core.CompanyServiceBasicImpl;
import uk.co.acuteit.app.service.implementations.core.ContractServiceBasicImplementation;
import uk.co.acuteit.app.service.implementations.core.ContractActivityTypeServiceBasicImplementation;
import uk.co.acuteit.app.service.implementations.core.LocationServiceBasicImpl;
import uk.co.acuteit.app.service.implementations.core.TaxYearServiceBasicImpl;
import uk.co.acuteit.app.service.implementations.mileage.MileageItemServiceBasicImpl;
import uk.co.acuteit.app.service.implementations.mileage.VehicleServiceBasicImpl;
import uk.co.acuteit.app.service.interfaces.core.ICompanyServiceBasic;
import uk.co.acuteit.app.service.interfaces.core.IContractServiceBasic;
import uk.co.acuteit.app.service.interfaces.core.IContractActivityType;
import uk.co.acuteit.app.service.interfaces.core.ILocationServiceBasic;
import uk.co.acuteit.app.service.interfaces.core.ITaxYearServiceBasic;
import uk.co.acuteit.app.service.interfaces.mileage.IMileageItemServiceBasic;
import uk.co.acuteit.app.service.interfaces.mileage.IVehicleServiceBasic;

import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;


/**
 * An application context Java configuration class. The usage of Java configuration
 * requires Spring Framework 3.0 or higher with following exceptions:
 * <ul>
 *     <li>@EnableWebMvc annotation requires Spring Framework 3.1</li>
 * </ul>
 * @author Petri Kainulainen
 */

@Configuration
@ComponentScan(basePackages = {"uk.co.acuteit.app.controller"})
@EnableWebMvc
@ImportResource("classpath:applicationContext.xml")
@PropertySource("classpath:application.properties")
public class ApplicationContext {
   
    private static final String VIEW_RESOLVER_PREFIX = "/WEB-INF/views/";
    private static final String VIEW_RESOLVER_SUFFIX = ".jsp";

    private static final String PROPERTY_NAME_DATABASE_DRIVER = "db.driver";
    private static final String PROPERTY_NAME_DATABASE_PASSWORD = "db.password";
    private static final String PROPERTY_NAME_DATABASE_URL = "db.url";
    private static final String PROPERTY_NAME_DATABASE_USERNAME = "db.username";

    private static final String PROPERTY_NAME_HIBERNATE_DIALECT = "hibernate.dialect";
    private static final String PROPERTY_NAME_HIBERNATE_FORMAT_SQL = "hibernate.format_sql";
    private static final String PROPERTY_NAME_HIBERNATE_NAMING_STRATEGY = "hibernate.ejb.naming_strategy";
    private static final String PROPERTY_NAME_HIBERNATE_SHOW_SQL = "hibernate.show_sql";
    private static final String PROPERTY_NAME_ENTITYMANAGER_PACKAGES_TO_SCAN = "entitymanager.packages.to.scan";
    private static final String PROPERTY_NAME_HBM2DLL = "hibernate.hbm2ddl.auto";

    private static final String PROPERTY_NAME_MESSAGESOURCE_BASENAME = "message.source.basename";
    private static final String PROPERTY_NAME_MESSAGESOURCE_USE_CODE_AS_DEFAULT_MESSAGE = "message.source.use.code.as.default.message";

    @Resource
    private Environment environment;

    @Bean
    public DataSource dataSource() {
    	
        //BoneCPDataSource dataSource = new BoneCPDataSource();
        MysqlDataSource dataSource = new MysqlDataSource();

        //dataSource.setDriverClass(environment.getRequiredProperty(PROPERTY_NAME_DATABASE_DRIVER));
        dataSource.setURL(environment.getRequiredProperty(PROPERTY_NAME_DATABASE_URL));
        dataSource.setUser(environment.getRequiredProperty(PROPERTY_NAME_DATABASE_USERNAME));
        dataSource.setPassword(environment.getRequiredProperty(PROPERTY_NAME_DATABASE_PASSWORD));

        return dataSource;
    }

    @Bean
    public JpaTransactionManager transactionManager() throws ClassNotFoundException {
        JpaTransactionManager transactionManager = new JpaTransactionManager();

        transactionManager.setEntityManagerFactory(entityManagerFactoryBean().getObject());

        return transactionManager;
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryBean() throws ClassNotFoundException {
        LocalContainerEntityManagerFactoryBean entityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();

        entityManagerFactoryBean.setDataSource(dataSource());
        entityManagerFactoryBean.setPackagesToScan(environment.getRequiredProperty(PROPERTY_NAME_ENTITYMANAGER_PACKAGES_TO_SCAN));
        entityManagerFactoryBean.setPersistenceProviderClass(HibernatePersistence.class);

        Properties jpaProterties = new Properties();
        jpaProterties.put(PROPERTY_NAME_HIBERNATE_DIALECT, environment.getRequiredProperty(PROPERTY_NAME_HIBERNATE_DIALECT));
        jpaProterties.put(PROPERTY_NAME_HIBERNATE_FORMAT_SQL, environment.getRequiredProperty(PROPERTY_NAME_HIBERNATE_FORMAT_SQL));
        jpaProterties.put(PROPERTY_NAME_HIBERNATE_NAMING_STRATEGY, environment.getRequiredProperty(PROPERTY_NAME_HIBERNATE_NAMING_STRATEGY));
        jpaProterties.put(PROPERTY_NAME_HIBERNATE_SHOW_SQL, environment.getRequiredProperty(PROPERTY_NAME_HIBERNATE_SHOW_SQL));
        jpaProterties.put(PROPERTY_NAME_HBM2DLL, environment.getRequiredProperty(PROPERTY_NAME_HBM2DLL));

        entityManagerFactoryBean.setJpaProperties(jpaProterties);

        return entityManagerFactoryBean;
    }

    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();

        messageSource.setBasename(environment.getRequiredProperty(PROPERTY_NAME_MESSAGESOURCE_BASENAME));
        messageSource.setUseCodeAsDefaultMessage(Boolean.parseBoolean(environment.getRequiredProperty(PROPERTY_NAME_MESSAGESOURCE_USE_CODE_AS_DEFAULT_MESSAGE)));

        return messageSource;
    }

    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();

        viewResolver.setViewClass(JstlView.class);
        viewResolver.setPrefix(VIEW_RESOLVER_PREFIX);
        viewResolver.setSuffix(VIEW_RESOLVER_SUFFIX);

        return viewResolver;
    }
    
    @Bean
    public IContractServiceBasic contractService() {
    	return new ContractServiceBasicImplementation();
    }
    
    @Bean
    public IMileageItemServiceBasic mileageItemService() {
    	return new MileageItemServiceBasicImpl();
    }
    
    @Bean
    public ILocationServiceBasic locationService() {
    	return new LocationServiceBasicImpl();
    }
    
    @Bean
    public ITaxYearServiceBasic taxYearService() {
    	return new TaxYearServiceBasicImpl();
    }
    
    @Bean
    public ICompanyServiceBasic companyService() {
    	return new CompanyServiceBasicImpl();
    }
    
    @Bean
    public IContractActivityType contractStatusService() {
    	return new ContractActivityTypeServiceBasicImplementation();
    }

    @Bean
    public IVehicleServiceBasic vehicleService() {
    	return new VehicleServiceBasicImpl();
    }
    
}
