Sure! Here's an example of a CRUD (Create, Read, Update, Delete) operation using Spring, Hibernate with Session in XML configuration, and MySQL database.

1. Create the database table:
```sql
CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  age INT,
  designation VARCHAR(100)
);
```

2. Configure the database connection in `applicationContext.xml`:
```xml
<!-- Data Source -->
<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
  <property name="driverClassName" value="com.mysql.jdbc.Driver" />
  <property name="url" value="jdbc:mysql://localhost:3306/mydatabase" />
  <property name="username" value="root" />
  <property name="password" value="password" />
</bean>

<!-- Hibernate Session Factory -->
<bean id="sessionFactory" class="org.springframework.orm.hibernate5.LocalSessionFactoryBean">
  <property name="dataSource" ref="dataSource" />
  <property name="hibernateProperties">
    <props>
      <prop key="hibernate.dialect">org.hibernate.dialect.MySQLDialect</prop>
      <prop key="hibernate.show_sql">true</prop>
    </props>
  </property>
  <property name="mappingResources">
    <list>
      <value>employee.hbm.xml</value>
    </list>
  </property>
</bean>
```

3. Create the `employee.hbm.xml` mapping file:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-mapping PUBLIC "-//Hibernate/Hibernate Mapping DTD 3.0//EN" "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">
<hibernate-mapping>
  <class name="com.example.Employee" table="employee">
    <id name="id" column="id">
      <generator class="native" />
    </id>
    <property name="name" column="name" />
    <property name="age" column="age" />
    <property name="designation" column="designation" />
  </class>
</hibernate-mapping>
```

4. Create the `Employee` entity class:
```java
public class Employee {
  private int id;
  private String name;
  private int age;
  private String designation;

  // Getters and Setters
}
```

5. Create the `EmployeeDAO` interface:
```java
public interface EmployeeDAO {
  void saveEmployee(Employee employee);
  Employee getEmployee(int id);
  List<Employee> getAllEmployees();
  void updateEmployee(Employee employee);
  void deleteEmployee(int id);
}
```

6. Create the `EmployeeDAOImpl` class:
```java
public class EmployeeDAOImpl implements EmployeeDAO {
  private SessionFactory sessionFactory;

  public void setSessionFactory(SessionFactory sessionFactory) {
    this.sessionFactory = sessionFactory;
  }

  @Override
  public void saveEmployee(Employee employee) {
    Session session = sessionFactory.getCurrentSession();
    session.save(employee);
  }

  @Override
  public Employee getEmployee(int id) {
    Session session = sessionFactory.getCurrentSession();
    return session.get(Employee.class, id);
  }

  @Override
  public List<Employee> getAllEmployees() {
    Session session = sessionFactory.getCurrentSession();
    CriteriaQuery<Employee> criteriaQuery = session.getCriteriaBuilder().createQuery(Employee.class);
    criteriaQuery.from(Employee.class);
    return session.createQuery(criteriaQuery).getResultList();
  }

  @Override
  public void updateEmployee(Employee employee) {
    Session session = sessionFactory.getCurrentSession();
    session.update(employee);
  }

  @Override
 

 public void deleteEmployee(int id) {
    Session session = sessionFactory.getCurrentSession();
    Employee employee = session.get(Employee.class, id);
    if (employee != null) {
      session.delete(employee);
    }
  }
}
```

7. Create the `EmployeeService` interface:
```java
public interface EmployeeService {
  void saveEmployee(Employee employee);
  Employee getEmployee(int id);
  List<Employee> getAllEmployees();
  void updateEmployee(Employee employee);
  void deleteEmployee(int id);
}
```

8. Create the `EmployeeServiceImpl` class:
```java
public class EmployeeServiceImpl implements EmployeeService {
  private EmployeeDAO employeeDAO;

  public void setEmployeeDAO(EmployeeDAO employeeDAO) {
    this.employeeDAO = employeeDAO;
  }

  @Override
  public void saveEmployee(Employee employee) {
    employeeDAO.saveEmployee(employee);
  }

  @Override
  public Employee getEmployee(int id) {
    return employeeDAO.getEmployee(id);
  }

  @Override
  public List<Employee> getAllEmployees() {
    return employeeDAO.getAllEmployees();
  }

  @Override
  public void updateEmployee(Employee employee) {
    employeeDAO.updateEmployee(employee);
  }

  @Override
  public void deleteEmployee(int id) {
    employeeDAO.deleteEmployee(id);
  }
}
```

9. Create the Spring configuration file `spring-config.xml`:
```xml
<!-- Component Scan -->
<context:component-scan base-package="com.example" />

<!-- Bean Definitions -->
<bean id="employeeDAO" class="com.example.EmployeeDAOImpl">
  <property name="sessionFactory" ref="sessionFactory" />
</bean>

<bean id="employeeService" class="com.example.EmployeeServiceImpl">
  <property name="employeeDAO" ref="employeeDAO" />
</bean>
```

10. Create the `MainApp` class to test the CRUD operations:
```java
public class MainApp {
  public static void main(String[] args) {
    ApplicationContext context = new ClassPathXmlApplicationContext("spring-config.xml");
    EmployeeService employeeService = context.getBean(EmployeeService.class);

    // Create and save an employee
    Employee employee = new Employee();
    employee.setName("John");
    employee.setAge(30);
    employee.setDesignation("Manager");
    employeeService.saveEmployee(employee);

    // Get and display an employee
    Employee retrievedEmployee = employeeService.getEmployee(1);
    System.out.println(retrievedEmployee);

    // Update an employee
    retrievedEmployee.setDesignation("Senior Manager");
    employeeService.updateEmployee(retrievedEmployee);

    // Delete an employee
    employeeService.deleteEmployee(1);

    // Get all employees
    List<Employee> employees = employeeService.getAllEmployees();
    System.out.println(employees);
  }
}
```

Make sure to replace the database connection details (`url`, `username`, `password`) in `applicationContext.xml` with your MySQL database configuration.

This example demonstrates the usage of Spring, Hibernate, and XML configuration to perform CRUD operations on an `Employee` entity. You can modify the code according to your specific requirements and table structure.