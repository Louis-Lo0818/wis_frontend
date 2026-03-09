import { useState } from 'react';
import { Book, Database, Server, Monitor, ChevronDown, ChevronRight, Copy, Check, Layers, ArrowRight, GitBranch, FileCode, FolderTree } from 'lucide-react';

type Section = 'overview' | 'database' | 'backend' | 'frontend' | 'api' | 'migration' | 'devdiary';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 my-4">
      {title && (
        <div className="bg-gray-100 px-4 py-2 flex items-center justify-between border-b border-gray-200">
          <span className="text-sm text-gray-700 font-mono">{title}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">{language}</span>
            <button onClick={handleCopy} className="text-gray-500 hover:text-gray-700 p-1">
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}
      <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function CollapsibleSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
      >
        <span className="font-medium text-gray-900">{title}</span>
        {open ? <ChevronDown className="h-5 w-5 text-gray-500" /> : <ChevronRight className="h-5 w-5 text-gray-500" />}
      </button>
      {open && <div className="px-4 py-4">{children}</div>}
    </div>
  );
}

// ─── Section Content ───────────────────────────────────────

function OverviewSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Architecture Overview</h2>
      <p className="text-gray-600">
        The Warehouse Inventory System is a full-stack application with a React/TypeScript frontend, 
        a Spring Boot (Java 21) REST API backend, and a MySQL 8.x relational database. 
        The frontend communicates with the backend exclusively via RESTful HTTP endpoints.
      </p>

      {/* Architecture Diagram */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Architecture Diagram</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 text-center min-w-[180px]">
            <Monitor className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="font-medium text-blue-900">Frontend</p>
            <p className="text-xs text-blue-700 mt-1">React + TypeScript</p>
            <p className="text-xs text-blue-700">Tailwind CSS</p>
            <p className="text-xs text-blue-700">React Router</p>
            <p className="text-xs text-blue-600 mt-2">Port 5173</p>
          </div>
          <ArrowRight className="h-6 w-6 text-gray-400 hidden md:block" />
          <div className="text-gray-400 md:hidden">|</div>
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 text-center min-w-[180px]">
            <Server className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="font-medium text-green-900">Backend</p>
            <p className="text-xs text-green-700 mt-1">Spring Boot 3.5.x</p>
            <p className="text-xs text-green-700">Java 21</p>
            <p className="text-xs text-green-700">Spring Data JPA</p>
            <p className="text-xs text-green-600 mt-2">Port 8080</p>
          </div>
          <ArrowRight className="h-6 w-6 text-gray-400 hidden md:block" />
          <div className="text-gray-400 md:hidden">|</div>
          <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6 text-center min-w-[180px]">
            <Database className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="font-medium text-orange-900">Database</p>
            <p className="text-xs text-orange-700 mt-1">MySQL 8.x</p>
            <p className="text-xs text-orange-700">InnoDB Engine</p>
            <p className="text-xs text-orange-600 mt-2">Port 3306</p>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">Frontend Stack</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>- React 19.x</li>
            <li>- TypeScript</li>
            <li>- Tailwind CSS 4.x</li>
            <li>- React Router 7.x</li>
            <li>- Vite (build tool)</li>
            <li>- Lucide React (icons)</li>
            <li>- Axios (HTTP client)</li>
          </ul>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-medium text-green-900 mb-2">Backend Stack</h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>- Java 21</li>
            <li>- Spring Boot 3.5.x</li>
            <li>- Spring Data JPA</li>
            <li>- Hibernate 6.x (ORM)</li>
            <li>- Maven</li>
            <li>- Lombok</li>
            <li>- OpenCSV</li>
          </ul>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h4 className="font-medium text-orange-900 mb-2">Database</h4>
          <ul className="text-sm text-orange-800 space-y-1">
            <li>- MySQL 8.0+</li>
            <li>- InnoDB engine</li>
            <li>- UTF-8 character set</li>
            <li>- Foreign key constraints</li>
            <li>- Composite unique indexes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DatabaseSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Database Design (MySQL)</h2>

      {/* ER Diagram */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Entity-Relationship Overview</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="border-2 border-blue-400 rounded-lg p-4 min-w-[200px]">
            <p className="font-bold text-blue-800 text-center border-b border-blue-200 pb-2 mb-2">product</p>
            <div className="text-sm text-gray-700 space-y-1 font-mono">
              <p><span className="text-yellow-600">PK</span> id BIGINT</p>
              <p><span className="text-red-600">UQ</span> code VARCHAR(50)</p>
              <p>name VARCHAR(200)</p>
              <p>weight DECIMAL(10,2)</p>
              <p>created_at DATETIME</p>
              <p>updated_at DATETIME</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">1 : N</p>
            <ArrowRight className="h-6 w-6 text-gray-400 hidden md:block" />
            <div className="text-gray-400 md:hidden text-2xl">&#8595;</div>
          </div>
          <div className="border-2 border-green-400 rounded-lg p-4 min-w-[200px]">
            <p className="font-bold text-green-800 text-center border-b border-green-200 pb-2 mb-2">inventory</p>
            <div className="text-sm text-gray-700 space-y-1 font-mono">
              <p><span className="text-yellow-600">PK</span> id BIGINT</p>
              <p><span className="text-blue-600">FK</span> product_id BIGINT</p>
              <p>location VARCHAR(50)</p>
              <p>quantity INT</p>
              <p>created_at DATETIME</p>
              <p>updated_at DATETIME</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">logged to</p>
            <ArrowRight className="h-6 w-6 text-gray-400 hidden md:block" />
            <div className="text-gray-400 md:hidden text-2xl">&#8595;</div>
          </div>
          <div className="border-2 border-purple-400 rounded-lg p-4 min-w-[200px]">
            <p className="font-bold text-purple-800 text-center border-b border-purple-200 pb-2 mb-2">transfer_log</p>
            <div className="text-sm text-gray-700 space-y-1 font-mono">
              <p><span className="text-yellow-600">PK</span> id BIGINT</p>
              <p><span className="text-blue-600">FK</span> product_id BIGINT</p>
              <p>from_location VARCHAR(50)</p>
              <p>to_location VARCHAR(50)</p>
              <p>quantity INT</p>
              <p>transferred_at DATETIME</p>
            </div>
          </div>
        </div>
      </div>

      <CollapsibleSection title="1. CREATE DATABASE & TABLES (DDL)" defaultOpen>
        <CodeBlock
          language="sql"
          title="schema.sql"
          code={`-- ============================================================
-- Warehouse Inventory System - MySQL Database Schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS warehouse_inventory
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE warehouse_inventory;

-- ============================================================
-- Table: product
-- Stores product master data imported via CSV
-- ============================================================
CREATE TABLE product (
    id          BIGINT       NOT NULL AUTO_INCREMENT,
    code        VARCHAR(50)  NOT NULL,
    name        VARCHAR(200) NOT NULL,
    weight      DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
                             ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uk_product_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Table: inventory
-- Stores quantity of each product at each warehouse location
-- ============================================================
CREATE TABLE inventory (
    id          BIGINT       NOT NULL AUTO_INCREMENT,
    product_id  BIGINT       NOT NULL,
    location    VARCHAR(50)  NOT NULL,
    quantity    INT          NOT NULL DEFAULT 0,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
                             ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uk_product_location (product_id, location),
    CONSTRAINT fk_inventory_product
        FOREIGN KEY (product_id) REFERENCES product(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_quantity_non_negative CHECK (quantity >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Table: transfer_log
-- Audit trail for every inventory transfer operation
-- ============================================================
CREATE TABLE transfer_log (
    id              BIGINT       NOT NULL AUTO_INCREMENT,
    product_id      BIGINT       NOT NULL,
    from_location   VARCHAR(50)  NOT NULL,
    to_location     VARCHAR(50)  NOT NULL,
    quantity        INT          NOT NULL,
    transferred_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    CONSTRAINT fk_transfer_product
        FOREIGN KEY (product_id) REFERENCES product(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_transfer_qty CHECK (quantity > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- Indexes for query performance
-- ============================================================
CREATE INDEX idx_inventory_location ON inventory(location);
CREATE INDEX idx_inventory_product  ON inventory(product_id);
CREATE INDEX idx_transfer_product   ON transfer_log(product_id);
CREATE INDEX idx_transfer_date      ON transfer_log(transferred_at);`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. Sample Seed Data (DML)">
        <CodeBlock
          language="sql"
          title="seed-data.sql"
          code={`USE warehouse_inventory;

-- Insert sample products
INSERT INTO product (code, name, weight) VALUES
    ('PRD001', 'Laptop Computer',       2.50),
    ('PRD002', 'Wireless Mouse',        0.10),
    ('PRD003', 'USB-C Cable',           0.05),
    ('PRD004', 'Monitor 27"',           5.20),
    ('PRD005', 'Keyboard Mechanical',   1.10);

-- Insert sample inventory levels
INSERT INTO inventory (product_id, location, quantity)
VALUES
    ((SELECT id FROM product WHERE code='PRD001'), 'TKO', 150),
    ((SELECT id FROM product WHERE code='PRD001'), 'CSW', 75),
    ((SELECT id FROM product WHERE code='PRD001'), 'KWN', 50),
    ((SELECT id FROM product WHERE code='PRD002'), 'TKO', 500),
    ((SELECT id FROM product WHERE code='PRD002'), 'CSW', 300),
    ((SELECT id FROM product WHERE code='PRD003'), 'TKO', 1000),
    ((SELECT id FROM product WHERE code='PRD003'), 'KWN', 800),
    ((SELECT id FROM product WHERE code='PRD004'), 'CSW', 200),
    ((SELECT id FROM product WHERE code='PRD004'), 'TKO', 100),
    ((SELECT id FROM product WHERE code='PRD005'), 'KWN', 250);`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="3. Column Reference Table">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Table</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Column</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Type</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Constraint</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                ['product', 'id', 'BIGINT AUTO_INCREMENT', 'PK', 'Surrogate primary key'],
                ['product', 'code', 'VARCHAR(50)', 'UNIQUE, NOT NULL', 'Business product code (e.g. PRD001)'],
                ['product', 'name', 'VARCHAR(200)', 'NOT NULL', 'Human-readable product name'],
                ['product', 'weight', 'DECIMAL(10,2)', 'DEFAULT 0.00', 'Weight per unit in kg'],
                ['product', 'created_at', 'DATETIME', 'DEFAULT NOW()', 'Row creation timestamp'],
                ['product', 'updated_at', 'DATETIME', 'ON UPDATE NOW()', 'Last update timestamp'],
                ['inventory', 'id', 'BIGINT AUTO_INCREMENT', 'PK', 'Surrogate primary key'],
                ['inventory', 'product_id', 'BIGINT', 'FK -> product.id', 'References parent product'],
                ['inventory', 'location', 'VARCHAR(50)', 'NOT NULL', 'Warehouse location code (TKO, CSW, etc.)'],
                ['inventory', 'quantity', 'INT', 'CHECK >= 0', 'Current quantity on hand'],
                ['transfer_log', 'id', 'BIGINT AUTO_INCREMENT', 'PK', 'Surrogate primary key'],
                ['transfer_log', 'product_id', 'BIGINT', 'FK -> product.id', 'Transferred product'],
                ['transfer_log', 'from_location', 'VARCHAR(50)', 'NOT NULL', 'Source warehouse'],
                ['transfer_log', 'to_location', 'VARCHAR(50)', 'NOT NULL', 'Destination warehouse'],
                ['transfer_log', 'quantity', 'INT', 'CHECK > 0', 'Units transferred'],
                ['transfer_log', 'transferred_at', 'DATETIME', 'DEFAULT NOW()', 'When transfer occurred'],
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-2 font-mono text-blue-700">{row[0]}</td>
                  <td className="px-4 py-2 font-mono">{row[1]}</td>
                  <td className="px-4 py-2 font-mono text-green-700">{row[2]}</td>
                  <td className="px-4 py-2 text-orange-700">{row[3]}</td>
                  <td className="px-4 py-2 text-gray-600">{row[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleSection>
    </div>
  );
}

function BackendSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Backend Design (Spring Boot)</h2>

      <CollapsibleSection title="1. Project Structure" defaultOpen>
        <CodeBlock
          language="text"
          title="Spring Boot Project Layout"
          code={`my-spring-project/
|-- pom.xml
|-- src/
|   |-- main/
|   |   |-- java/wis/my_spring_project/
|   |   |   |-- MySpringProjectApplication.java      <-- @SpringBootApplication
|   |   |   |
|   |   |   |-- config/
|   |   |   |   |-- CorsConfig.java                  <-- CORS for React dev server
|   |   |   |   |-- OpenApiConfig.java                <-- Swagger/OpenAPI config
|   |   |   |
|   |   |   |-- controller/
|   |   |   |   |-- ProductController.java            <-- /api/products
|   |   |   |   |-- InventoryController.java          <-- /api/inventory
|   |   |   |   |-- TransferController.java           <-- /api/transfers
|   |   |   |   |-- CsvImportController.java          <-- /api/import
|   |   |   |   |-- DashboardController.java          <-- /api/dashboard
|   |   |   |
|   |   |   |-- service/
|   |   |   |   |-- ProductService.java
|   |   |   |   |-- InventoryService.java
|   |   |   |   |-- TransferService.java
|   |   |   |   |-- CsvImportService.java
|   |   |   |   |-- DashboardService.java
|   |   |   |
|   |   |   |-- repository/
|   |   |   |   |-- ProductRepository.java            <-- JpaRepository<Product, Long>
|   |   |   |   |-- InventoryRepository.java          <-- JpaRepository<Inventory, Long>
|   |   |   |   |-- TransferLogRepository.java        <-- JpaRepository<TransferLog, Long>
|   |   |   |
|   |   |   |-- entity/
|   |   |   |   |-- Product.java                      <-- @Entity
|   |   |   |   |-- Inventory.java                    <-- @Entity
|   |   |   |   |-- TransferLog.java                  <-- @Entity
|   |   |   |
|   |   |   |-- dto/
|   |   |   |   |-- ProductDTO.java
|   |   |   |   |-- InventoryLevelDTO.java
|   |   |   |   |-- TransferRequestDTO.java
|   |   |   |   |-- TransferResponseDTO.java
|   |   |   |   |-- DashboardDTO.java
|   |   |   |   |-- ImportResultDTO.java
|   |   |   |
|   |   |   |-- exception/
|   |   |       |-- ResourceNotFoundException.java
|   |   |       |-- InsufficientQuantityException.java
|   |   |       |-- GlobalExceptionHandler.java       <-- @ControllerAdvice
|   |   |
|   |   |-- resources/
|   |       |-- application.yml
|   |       |-- schema.sql
|   |       |-- data.sql
|   |
|   |-- test/
|       |-- java/wis/my_spring_project/
|           |-- controller/
|           |   |-- ProductControllerTest.java
|           |   |-- InventoryControllerTest.java
|           |   |-- TransferControllerTest.java
|           |-- service/
|           |   |-- ProductServiceTest.java
|           |   |-- InventoryServiceTest.java
|           |   |-- TransferServiceTest.java
|           |-- repository/
|               |-- ProductRepositoryTest.java`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. pom.xml (Maven Dependencies)">
        <CodeBlock
          language="xml"
          title="pom.xml"
          code={`<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.5.11</version>
    </parent>

    <groupId>wis</groupId>
    <artifactId>my-spring-project</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>my-spring-project</name>

    <properties>
        <java.version>21</java.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Web (REST) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Data JPA + Hibernate -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- MySQL Connector -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- Lombok (reduce boilerplate) -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- OpenCSV (CSV parsing) -->
        <dependency>
            <groupId>com.opencsv</groupId>
            <artifactId>opencsv</artifactId>
            <version>5.11.1</version>
        </dependency>

        <!-- Swagger / OpenAPI -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>2.8.6</version>
        </dependency>

        <!-- Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <!-- H2 for integration tests -->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="3. application.yml">
        <CodeBlock
          language="yaml"
          title="src/main/resources/application.yml"
          code={`server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/warehouse_inventory?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
    username: root
    password: your_password_here
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: validate        # Use 'update' during dev, 'validate' in prod
    show-sql: false
    open-in-view: false

  sql:
    init:
      mode: always

# Swagger UI at http://localhost:8080/swagger-ui.html
springdoc:
  api-docs:
    path: /v3/api-docs
  swagger-ui:
    path: /swagger-ui.html`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="4. Entity Classes">
        <CodeBlock
          language="java"
          title="entity/Product.java"
          code={`package wis.my_spring_project.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "product")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, unique = true, nullable = false)
    private String code;

    @Column(length = 200, nullable = false)
    private String name;

    @Column(precision = 10, scale = 2)
    private BigDecimal weight;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}`}
        />
        <CodeBlock
          language="java"
          title="entity/Inventory.java"
          code={`package wis.my_spring_project.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventory",
       uniqueConstraints = @UniqueConstraint(
           columnNames = {"product_id", "location"}
       ))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(length = 50, nullable = false)
    private String location;

    @Column(nullable = false)
    private Integer quantity;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}`}
        />
        <CodeBlock
          language="java"
          title="entity/TransferLog.java"
          code={`package wis.my_spring_project.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "transfer_log")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TransferLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "from_location", length = 50, nullable = false)
    private String fromLocation;

    @Column(name = "to_location", length = 50, nullable = false)
    private String toLocation;

    @Column(nullable = false)
    private Integer quantity;

    @CreationTimestamp
    @Column(name = "transferred_at", nullable = false, updatable = false)
    private LocalDateTime transferredAt;
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="5. Repository Interfaces">
        <CodeBlock
          language="java"
          title="repository/ProductRepository.java"
          code={`package wis.my_spring_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wis.my_spring_project.entity.Product;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByCode(String code);
}`}
        />
        <CodeBlock
          language="java"
          title="repository/InventoryRepository.java"
          code={`package wis.my_spring_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import wis.my_spring_project.entity.Inventory;
import wis.my_spring_project.entity.Product;
import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    List<Inventory> findByProductCode(String code);

    Optional<Inventory> findByProductAndLocation(Product product, String location);

    @Query("SELECT DISTINCT i.location FROM Inventory i")
    List<String> findDistinctLocations();

    @Query("SELECT i FROM Inventory i JOIN FETCH i.product")
    List<Inventory> findAllWithProduct();

    @Query("SELECT i FROM Inventory i JOIN FETCH i.product WHERE i.product.code = :code")
    List<Inventory> findByProductCodeWithProduct(@Param("code") String code);

    @Query("SELECT COALESCE(SUM(i.quantity), 0) FROM Inventory i")
    Integer sumTotalQuantity();
}`}
        />
        <CodeBlock
          language="java"
          title="repository/TransferLogRepository.java"
          code={`package wis.my_spring_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wis.my_spring_project.entity.TransferLog;
import java.util.List;

@Repository
public interface TransferLogRepository extends JpaRepository<TransferLog, Long> {

    List<TransferLog> findByProductId(Long productId);
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="6. DTO Classes">
        <CodeBlock
          language="java"
          title="dto/ProductDTO.java"
          code={`package wis.my_spring_project.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ProductDTO {

    private Long id;

    @NotBlank(message = "Product code is required")
    private String code;

    @NotBlank(message = "Product name is required")
    private String name;

    private BigDecimal weight;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}`}
        />
        <CodeBlock
          language="java"
          title="dto/InventoryLevelDTO.java"
          code={`package wis.my_spring_project.dto;

import lombok.*;

// Flat DTO — one row per product+location combination.
// The frontend groups these by productCode for display.
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class InventoryLevelDTO {

    private String productCode;
    private String productName;
    private String location;
    private Integer quantity;
}`}
        />
        <CodeBlock
          language="java"
          title="dto/TransferRequestDTO.java"
          code={`package wis.my_spring_project.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class TransferRequestDTO {

    @NotBlank(message = "Product code is required")
    private String productCode;

    @NotBlank(message = "From location is required")
    private String fromLocation;

    @NotBlank(message = "To location is required")
    private String toLocation;

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be > 0")
    private Integer quantity;
}`}
        />
        <CodeBlock
          language="java"
          title="dto/DashboardDTO.java"
          code={`package wis.my_spring_project.dto;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class DashboardDTO {
    private Long totalProducts;
    private Long totalLocations;
    private Long totalInventoryRecords;  // total number of inventory rows
    private Integer totalQuantity;       // sum of all quantities across all locations
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="7. Service Layer">
        <CodeBlock
          language="java"
          title="service/ProductService.java"
          code={`package wis.my_spring_project.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wis.my_spring_project.dto.ProductDTO;
import wis.my_spring_project.entity.Product;
import wis.my_spring_project.exception.ResourceNotFoundException;
import wis.my_spring_project.repository.ProductRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO getProductByCode(String code) {
        Product product = productRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Product not found with code: " + code));
        return toDTO(product);
    }

    @Transactional
    public List<ProductDTO> importProducts(List<ProductDTO> dtos) {
        return dtos.stream().map(dto -> {
            Product product = productRepository.findByCode(dto.getCode())
                    .orElse(new Product());
            product.setCode(dto.getCode());
            product.setName(dto.getName());
            product.setWeight(dto.getWeight());
            return toDTO(productRepository.save(product));
        }).collect(Collectors.toList());
    }

    private ProductDTO toDTO(Product p) {
        return ProductDTO.builder()
                .id(p.getId())
                .code(p.getCode())
                .name(p.getName())
                .weight(p.getWeight())
                .createdAt(p.getCreatedAt())
                .updatedAt(p.getUpdatedAt())
                .build();
    }
}`}
        />
        <CodeBlock
          language="java"
          title="service/TransferService.java"
          code={`package wis.my_spring_project.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wis.my_spring_project.dto.TransferRequestDTO;
import wis.my_spring_project.dto.TransferResponseDTO;
import wis.my_spring_project.entity.*;
import wis.my_spring_project.exception.*;
import wis.my_spring_project.repository.*;

@Service
@RequiredArgsConstructor
public class TransferService {

    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;
    private final TransferLogRepository transferLogRepository;

    @Transactional
    public TransferResponseDTO transfer(TransferRequestDTO request) {
        // 1. Validate product exists
        Product product = productRepository.findByCode(request.getProductCode())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Product not found: " + request.getProductCode()));

        // 2. Validate source has enough stock
        Inventory source = inventoryRepository
                .findByProductAndLocation(product, request.getFromLocation())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "No inventory at source location: " + request.getFromLocation()));

        if (source.getQuantity() < request.getQuantity()) {
            throw new InsufficientQuantityException(
                "Insufficient quantity at " + request.getFromLocation()
                + ". Available: " + source.getQuantity()
                + ", Requested: " + request.getQuantity());
        }

        // 3. Deduct from source
        source.setQuantity(source.getQuantity() - request.getQuantity());
        inventoryRepository.save(source);

        // 4. Add to destination (upsert)
        Inventory dest = inventoryRepository
                .findByProductAndLocation(product, request.getToLocation())
                .orElse(Inventory.builder()
                        .product(product)
                        .location(request.getToLocation())
                        .quantity(0)
                        .build());
        dest.setQuantity(dest.getQuantity() + request.getQuantity());
        inventoryRepository.save(dest);

        // 5. Log the transfer
        TransferLog log = TransferLog.builder()
                .product(product)
                .fromLocation(request.getFromLocation())
                .toLocation(request.getToLocation())
                .quantity(request.getQuantity())
                .build();
        transferLogRepository.save(log);

        return TransferResponseDTO.builder()
                .status("SUCCESS")
                .message("Transferred " + request.getQuantity() + " units of "
                        + request.getProductCode() + " from " + request.getFromLocation()
                        + " to " + request.getToLocation())
                .build();
    }
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="8. Controller Layer">
        <CodeBlock
          language="java"
          title="controller/ProductController.java"
          code={`package wis.my_spring_project.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wis.my_spring_project.dto.ProductDTO;
import wis.my_spring_project.service.ProductService;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{code}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable String code) {
        return ResponseEntity.ok(productService.getProductByCode(code));
    }

    @PostMapping("/import")
    public ResponseEntity<List<ProductDTO>> importProducts(
            @Valid @RequestBody List<ProductDTO> products) {
        return ResponseEntity.ok(productService.importProducts(products));
    }
}`}
        />
        <CodeBlock
          language="java"
          title="controller/InventoryController.java"
          code={`package wis.my_spring_project.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wis.my_spring_project.dto.InventoryLevelDTO;
import wis.my_spring_project.service.InventoryService;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
@CrossOrigin
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<List<InventoryLevelDTO>> getAllInventory() {
        return ResponseEntity.ok(inventoryService.getAllInventory());
    }

    @GetMapping("/search")
    public ResponseEntity<List<InventoryLevelDTO>> searchInventory(
            @RequestParam String code) {
        return ResponseEntity.ok(inventoryService.searchByProductCode(code));
    }

    @GetMapping("/locations")
    public ResponseEntity<List<String>> getLocations() {
        return ResponseEntity.ok(inventoryService.getLocations());
    }
}`}
        />
        <CodeBlock
          language="java"
          title="controller/TransferController.java"
          code={`package wis.my_spring_project.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wis.my_spring_project.dto.TransferRequestDTO;
import wis.my_spring_project.dto.TransferResponseDTO;
import wis.my_spring_project.service.TransferService;

@RestController
@RequestMapping("/api/transfers")
@RequiredArgsConstructor
@CrossOrigin
public class TransferController {

    private final TransferService transferService;

    @PostMapping
    public ResponseEntity<TransferResponseDTO> transfer(
            @Valid @RequestBody TransferRequestDTO request) {
        return ResponseEntity.ok(transferService.transfer(request));
    }
}`}
        />
        <CodeBlock
          language="java"
          title="controller/CsvImportController.java"
          code={`package wis.my_spring_project.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import wis.my_spring_project.dto.ImportResultDTO;
import wis.my_spring_project.service.CsvImportService;

@RestController
@RequestMapping("/api/import")
@RequiredArgsConstructor
@CrossOrigin
public class CsvImportController {

    private final CsvImportService csvImportService;

    @PostMapping("/products")
    public ResponseEntity<ImportResultDTO> importProducts(
            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(csvImportService.importProductsCsv(file));
    }

    @PostMapping("/inventory")
    public ResponseEntity<ImportResultDTO> importInventory(
            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(csvImportService.importInventoryCsv(file));
    }
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="9. Exception Handling">
        <CodeBlock
          language="java"
          title="exception/GlobalExceptionHandler.java"
          code={`package wis.my_spring_project.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(ResourceNotFoundException ex) {
        return buildResponse("Not Found", ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InsufficientQuantityException.class)
    public ResponseEntity<Map<String, Object>> handleInsufficient(InsufficientQuantityException ex) {
        return buildResponse("Bad Request", ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.joining(", "));
        return buildResponse("Validation Failed", message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneric(Exception ex) {
        return buildResponse("Internal Server Error", "An unexpected error occurred",
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<Map<String, Object>> buildResponse(
            String error, String message, HttpStatus status) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("error", error);
        body.put("message", message);
        body.put("status", status.value());
        return new ResponseEntity<>(body, status);
    }
}

// ResourceNotFoundException.java
// public class ResourceNotFoundException extends RuntimeException {
//     public ResourceNotFoundException(String message) { super(message); }
// }

// InsufficientQuantityException.java
// public class InsufficientQuantityException extends RuntimeException {
//     public InsufficientQuantityException(String message) { super(message); }
// }`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="10. CORS Configuration">
        <CodeBlock
          language="java"
          title="config/CorsConfig.java"
          code={`package wis.my_spring_project.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("*")
                .allowedHeaders("*");
    }
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="11. Unit & Integration Tests">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 mb-4">
          <p className="font-semibold mb-1">43 tests — all passing ✓</p>
          <p>7 TransferService unit tests · 9 ProductService unit tests · 8 ProductController · 8 TransferController · 7 InventoryController · 3 DashboardController · 1 smoke test</p>
        </div>

        <CodeBlock
          language="java"
          title="src/test/resources/application.properties (H2 test profile)"
          code={`# Use H2 in-memory database for all tests
spring.datasource.url=jdbc:h2:mem:testdb;MODE=MySQL;DB_CLOSE_DELAY=-1
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.sql.init.mode=never`}
        />

        <CodeBlock
          language="java"
          title="service/TransferServiceTest.java — 7 Mockito unit tests"
          code={`@ExtendWith(MockitoExtension.class)
class TransferServiceTest {

    @Mock private ProductRepository productRepository;
    @Mock private InventoryRepository inventoryRepository;
    @Mock private TransferLogRepository transferLogRepository;
    @InjectMocks private TransferService transferService;

    private Product buildProduct(String code) {
        return Product.builder().id(1L).code(code).name("Test Product")
                .weight(BigDecimal.valueOf(1.5)).build();
    }

    private Inventory buildInventory(Product product, String location, int quantity) {
        return Inventory.builder().id(1L).product(product)
                .location(location).quantity(quantity).build();
    }

    @Test
    void transfer_success_deductsSourceAndAddsDestination() {
        Product product = buildProduct("PRD001");
        Inventory source = buildInventory(product, "TKO", 100);
        Inventory dest   = buildInventory(product, "CSW", 20);

        when(productRepository.findByCode("PRD001")).thenReturn(Optional.of(product));
        when(inventoryRepository.findByProductAndLocation(product, "TKO")).thenReturn(Optional.of(source));
        when(inventoryRepository.findByProductAndLocation(product, "CSW")).thenReturn(Optional.of(dest));

        TransferRequestDTO req = TransferRequestDTO.builder()
                .productCode("PRD001").fromLocation("TKO").toLocation("CSW").quantity(30).build();

        TransferResponseDTO response = transferService.transfer(req);

        assertEquals("SUCCESS", response.getStatus());
        assertEquals(70, source.getQuantity());  // 100 - 30
        assertEquals(50, dest.getQuantity());    // 20 + 30
        verify(inventoryRepository, times(2)).save(any(Inventory.class));
        verify(transferLogRepository).save(any(TransferLog.class));
    }

    @Test
    void transfer_success_createsNewDestinationIfNotExists() {
        Product product = buildProduct("PRD001");
        Inventory source = buildInventory(product, "TKO", 100);

        when(productRepository.findByCode("PRD001")).thenReturn(Optional.of(product));
        when(inventoryRepository.findByProductAndLocation(product, "TKO")).thenReturn(Optional.of(source));
        when(inventoryRepository.findByProductAndLocation(product, "NEW_LOCATION")).thenReturn(Optional.empty());

        assertDoesNotThrow(() -> transferService.transfer(TransferRequestDTO.builder()
                .productCode("PRD001").fromLocation("TKO").toLocation("NEW_LOCATION").quantity(40).build()));

        assertEquals(60, source.getQuantity());
        verify(inventoryRepository, times(2)).save(any(Inventory.class));
    }

    @Test
    void transfer_productNotFound_throwsResourceNotFoundException() {
        when(productRepository.findByCode("INVALID")).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class,
                () -> transferService.transfer(TransferRequestDTO.builder()
                        .productCode("INVALID").fromLocation("TKO").toLocation("CSW").quantity(10).build()));
        verify(transferLogRepository, never()).save(any());
    }

    @Test
    void transfer_insufficientQuantity_throwsInsufficientQuantityException() {
        Product product = buildProduct("PRD001");
        Inventory source = buildInventory(product, "TKO", 10);

        when(productRepository.findByCode("PRD001")).thenReturn(Optional.of(product));
        when(inventoryRepository.findByProductAndLocation(product, "TKO")).thenReturn(Optional.of(source));

        InsufficientQuantityException ex = assertThrows(InsufficientQuantityException.class,
                () -> transferService.transfer(TransferRequestDTO.builder()
                        .productCode("PRD001").fromLocation("TKO").toLocation("CSW").quantity(50).build()));

        assertTrue(ex.getMessage().contains("10"));  // available
        assertTrue(ex.getMessage().contains("50"));  // requested
        verify(inventoryRepository, never()).save(any());
        verify(transferLogRepository, never()).save(any());
    }
}`}
        />

        <CodeBlock
          language="java"
          title="controller/TransferControllerIntegrationTest.java — @SpringBootTest"
          code={`@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class TransferControllerIntegrationTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private ProductRepository productRepository;
    @Autowired private InventoryRepository inventoryRepository;
    @Autowired private TransferLogRepository transferLogRepository;

    @BeforeEach
    void setUp() {
        transferLogRepository.deleteAll();
        inventoryRepository.deleteAll();
        productRepository.deleteAll();
    }

    @Test
    void transfer_success_returns200AndDeductsSource() throws Exception {
        Product product = productRepository.save(Product.builder()
                .code("PRD001").name("Laptop").weight(BigDecimal.valueOf(2.5)).build());
        inventoryRepository.save(Inventory.builder().product(product).location("TKO").quantity(100).build());
        inventoryRepository.save(Inventory.builder().product(product).location("CSW").quantity(0).build());

        mockMvc.perform(post("/api/transfers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(TransferRequestDTO.builder()
                                .productCode("PRD001").fromLocation("TKO").toLocation("CSW").quantity(30).build())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"));

        Inventory source = inventoryRepository.findByProductAndLocation(product, "TKO").orElseThrow();
        assertEquals(70, source.getQuantity());
    }

    @Test
    void transfer_insufficientQty_returns400() throws Exception {
        Product product = productRepository.save(Product.builder()
                .code("PRD001").name("Laptop").weight(BigDecimal.valueOf(2.5)).build());
        inventoryRepository.save(Inventory.builder().product(product).location("TKO").quantity(5).build());

        mockMvc.perform(post("/api/transfers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(TransferRequestDTO.builder()
                                .productCode("PRD001").fromLocation("TKO").toLocation("CSW").quantity(100).build())))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Bad Request"));
    }

    @Test
    void transfer_missingProductCode_returns400() throws Exception {
        mockMvc.perform(post("/api/transfers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest());
    }
}`}
        />
      </CollapsibleSection>
    </div>
  );
}

function ApiSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">REST API Reference</h2>
      <p className="text-gray-600">
        All endpoints are prefixed with <code className="bg-gray-100 px-1 rounded">/api</code>. 
        The backend runs on <code className="bg-gray-100 px-1 rounded">http://localhost:8080</code>.
        Swagger UI is available at <code className="bg-gray-100 px-1 rounded">/swagger-ui.html</code>.
      </p>

      {/* API Endpoint Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Method</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Endpoint</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Description</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Request Body</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Response</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[
              { method: 'GET', endpoint: '/api/products', desc: 'List all products', body: '-', resp: 'ProductDTO[]' },
              { method: 'GET', endpoint: '/api/products/{code}', desc: 'Get product by code', body: '-', resp: 'ProductDTO' },
              { method: 'POST', endpoint: '/api/products/import', desc: 'Bulk upsert products (JSON)', body: 'ProductDTO[]', resp: 'ProductDTO[]' },
              { method: 'POST', endpoint: '/api/import/products', desc: 'Upload products CSV file', body: 'multipart/form-data', resp: 'ImportResultDTO' },
              { method: 'POST', endpoint: '/api/import/inventory', desc: 'Upload inventory CSV file', body: 'multipart/form-data', resp: 'ImportResultDTO' },
              { method: 'GET', endpoint: '/api/inventory', desc: 'List all inventory levels', body: '-', resp: 'InventoryLevelDTO[]' },
              { method: 'GET', endpoint: '/api/inventory/search?code=X', desc: 'Search inventory by product code', body: '-', resp: 'InventoryLevelDTO[]' },
              { method: 'GET', endpoint: '/api/inventory/locations', desc: 'List all warehouse locations', body: '-', resp: 'string[]' },
              { method: 'POST', endpoint: '/api/transfers', desc: 'Transfer inventory between locations', body: 'TransferRequestDTO', resp: '{ status, message }' },
              { method: 'GET', endpoint: '/api/dashboard', desc: 'Get dashboard summary', body: '-', resp: 'DashboardDTO' },
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-2">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-mono font-medium ${
                    row.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {row.method}
                  </span>
                </td>
                <td className="px-4 py-2 font-mono text-sm">{row.endpoint}</td>
                <td className="px-4 py-2 text-gray-700">{row.desc}</td>
                <td className="px-4 py-2 font-mono text-xs text-gray-600">{row.body}</td>
                <td className="px-4 py-2 font-mono text-xs text-purple-700">{row.resp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CollapsibleSection title="Request / Response Examples" defaultOpen>
        <h4 className="font-medium text-gray-900 mb-2">GET /api/products</h4>
        <CodeBlock
          language="json"
          title="Response: 200 OK"
          code={`[
  {
    "id": 1,
    "code": "PRD001",
    "name": "Laptop Computer",
    "weight": 2.50
  },
  {
    "id": 2,
    "code": "PRD002",
    "name": "Wireless Mouse",
    "weight": 0.10
  }
]`}
        />

        <h4 className="font-medium text-gray-900 mb-2 mt-6">GET /api/inventory/search?code=PRD001</h4>
        <CodeBlock
          language="json"
          title="Response: 200 OK"
          code={`[
  {
    "productCode": "PRD001",
    "productName": "Laptop Computer",
    "location": "TKO",
    "quantity": 150
  },
  {
    "productCode": "PRD001",
    "productName": "Laptop Computer",
    "location": "CSW",
    "quantity": 75
  },
  {
    "productCode": "PRD001",
    "productName": "Laptop Computer",
    "location": "KWN",
    "quantity": 50
  }
]`}
        />

        <h4 className="font-medium text-gray-900 mb-2 mt-6">POST /api/transfers</h4>
        <CodeBlock
          language="json"
          title="Request Body"
          code={`{
  "productCode": "PRD001",
  "fromLocation": "TKO",
  "toLocation": "CSW",
  "quantity": 25
}`}
        />
        <CodeBlock
          language="json"
          title="Response: 200 OK"
          code={`{
  "status": "SUCCESS",
  "message": "Transferred 25 units of PRD001 from TKO to CSW"
}`}
        />

        <h4 className="font-medium text-gray-900 mb-2 mt-6">POST /api/transfers (Error: Insufficient)</h4>
        <CodeBlock
          language="json"
          title="Response: 400 Bad Request"
          code={`{
  "error": "Bad Request",
  "message": "Insufficient quantity at TKO. Available: 150, Requested: 999",
  "status": 400
}`}
        />

        <h4 className="font-medium text-gray-900 mb-2 mt-6">GET /api/dashboard</h4>
        <CodeBlock
          language="json"
          title="Response: 200 OK"
          code={`{
  "totalProducts": 5,
  "totalLocations": 3,
  "totalInventoryRecords": 10,
  "totalQuantity": 2425
}`}
        />

        <h4 className="font-medium text-gray-900 mb-2 mt-6">POST /api/import/products (multipart CSV upload)</h4>
        <CodeBlock
          language="bash"
          title="cURL Example"
          code={`curl -X POST http://localhost:8080/api/import/products \\
  -F "file=@products.csv"

# Response: 200 OK
{
  "success": true,
  "importedCount": 5,
  "skippedCount": 0,
  "errors": []
}`}
        />
      </CollapsibleSection>
    </div>
  );
}

function FrontendSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Frontend Architecture</h2>

      <CollapsibleSection title="1. Project Structure" defaultOpen>
        <CodeBlock
          language="text"
          title="React Frontend Layout"
          code={`src/
|-- app/
|   |-- App.tsx                        <-- Entry point, RouterProvider
|   |-- routes.ts                      <-- React Router config
|   |-- types.ts                       <-- TypeScript interfaces
|   |
|   |-- components/
|   |   |-- Layout.tsx                 <-- Nav bar (desktop + mobile) + Outlet
|   |   |-- Dashboard.tsx              <-- / (stats overview)
|   |   |-- ImportData.tsx             <-- /import (CSV upload)
|   |   |-- ViewInventory.tsx          <-- /inventory (search & list)
|   |   |-- TransferInventory.tsx      <-- /transfer (move stock)
|   |   |-- Documentation.tsx          <-- /docs (this page)
|   |
|   |-- lib/
|   |   |-- api.ts                     <-- Axios HTTP client
|   |   |-- csv.ts                     <-- CSV parse/generate helpers
|
|-- styles/
    |-- fonts.css
    |-- theme.css`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. API Client Layer (lib/api.ts)" defaultOpen>
        <p className="text-sm text-gray-600 mb-3">
          All backend communication goes through <code className="bg-gray-100 px-1 rounded">lib/api.ts</code>. 
          Because the backend returns flat <code className="bg-gray-100 px-1 rounded">InventoryLevelDTO</code> records, 
          <code className="bg-gray-100 px-1 rounded">getInventoryLevels()</code> and <code className="bg-gray-100 px-1 rounded">searchInventory()</code> 
          fetch products in parallel and group the data client-side.
        </p>
        <CodeBlock
          language="typescript"
          title="src/app/lib/api.ts"
          code={`import axios from 'axios';
import type {
  Product, InventoryLevel, TransferRequest,
  DashboardData, ImportResult, FlatInventoryItem,
} from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

// ─── Products ────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>('/products');
  return data;
}

// ─── Inventory ───────────────────────────────────────────────

// Groups flat backend rows (one per product+location) into
// the InventoryLevel shape used by the UI components.
function transformInventoryItems(
  items: FlatInventoryItem[],
  weightMap: Map<string, number>
): InventoryLevel[] {
  const grouped = new Map<string, {
    productCode: string; productName: string;
    locations: { location: string; quantity: number }[];
    totalQuantity: number;
  }>();

  items.forEach((item) => {
    if (!grouped.has(item.productCode)) {
      grouped.set(item.productCode, {
        productCode: item.productCode, productName: item.productName,
        locations: [], totalQuantity: 0,
      });
    }
    const group = grouped.get(item.productCode)!;
    group.locations.push({ location: item.location, quantity: item.quantity });
    group.totalQuantity += item.quantity;
  });

  return Array.from(grouped.values()).map((g) => ({
    ...g, weight: weightMap.get(g.productCode) ?? 0,
  })) as InventoryLevel[];
}

export async function getInventoryLevels(): Promise<InventoryLevel[]> {
  const [inventoryData, productsData] = await Promise.all([
    api.get<FlatInventoryItem[]>('/inventory'),
    api.get<Product[]>('/products'),
  ]);
  const weightMap = new Map(productsData.data.map((p) => [p.code, p.weight]));
  return transformInventoryItems(inventoryData.data, weightMap);
}

export async function searchInventory(code: string): Promise<InventoryLevel[]> {
  const [inventoryData, productsData] = await Promise.all([
    api.get<FlatInventoryItem[]>('/inventory/search', { params: { code } }),
    api.get<Product[]>('/products'),
  ]);
  const weightMap = new Map(productsData.data.map((p) => [p.code, p.weight]));
  return transformInventoryItems(inventoryData.data, weightMap);
}

export async function getLocations(): Promise<string[]> {
  const { data } = await api.get<string[]>('/inventory/locations');
  return data;
}

// ─── Transfers ───────────────────────────────────────────────

export async function transferInventory(
  request: TransferRequest
): Promise<{ status: string; message: string }> {
  const { data } = await api.post<{ status: string; message: string }>(
    '/transfers', request
  );
  return data;
}

// ─── Import (multipart CSV) ──────────────────────────────────

export async function uploadProductsCsv(file: File): Promise<ImportResult> {
  const form = new FormData();
  form.append('file', file);
  const { data } = await api.post<ImportResult>('/import/products', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function uploadInventoryCsv(file: File): Promise<ImportResult> {
  const form = new FormData();
  form.append('file', file);
  const { data } = await api.post<ImportResult>('/import/inventory', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

// ─── Dashboard ───────────────────────────────────────────────

export async function getDashboardData(): Promise<DashboardData> {
  const { data } = await api.get<DashboardData>('/dashboard');
  return data;
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="3. Component-to-API Mapping">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Component</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Route</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">API Calls</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">lib/api.ts Functions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                ['Dashboard', '/', 'GET /api/dashboard', 'getDashboardData()'],
                ['ImportData', '/import', 'POST /api/import/products\nPOST /api/import/inventory', 'uploadProductsCsv(file)\nuploadInventoryCsv(file)'],
                ['ViewInventory', '/inventory', 'GET /api/inventory\nGET /api/inventory/search\nGET /api/products', 'getInventoryLevels()\nsearchInventory(code)'],
                ['TransferInventory', '/transfer', 'POST /api/transfers\nGET /api/products\nGET /api/inventory/locations', 'transferInventory(req)\ngetProducts()\ngetLocations()'],
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-2 font-medium text-blue-700">{row[0]}</td>
                  <td className="px-4 py-2 font-mono">{row[1]}</td>
                  <td className="px-4 py-2 font-mono text-xs whitespace-pre-line text-green-700">{row[2]}</td>
                  <td className="px-4 py-2 font-mono text-xs whitespace-pre-line text-green-700">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="4. Environment Variables">
        <CodeBlock
          language="bash"
          title=".env (React/Vite)"
          code={`# Backend API base URL
VITE_API_BASE_URL=http://localhost:8080/api

# For production, point to your deployed backend:
# VITE_API_BASE_URL=https://api.yoursite.com/api`}
        />
      </CollapsibleSection>
    </div>
  );
}

function MigrationSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Migration Guide: localStorage to REST API</h2>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
        <p className="font-medium mb-1">Migration Complete</p>
        <p>The frontend has been fully migrated from <code className="bg-green-100 px-1 rounded">lib/storage.ts</code> (localStorage) 
        to <code className="bg-green-100 px-1 rounded">lib/api.ts</code> (Spring Boot REST API). 
        All components now use async API calls backed by MySQL. The unused <code className="bg-green-100 px-1 rounded">storage.ts</code> file has been removed.</p>
      </div>

      <CollapsibleSection title="Step-by-step Migration" defaultOpen>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">1</div>
            <div>
              <h4 className="font-medium text-gray-900">Set up Spring Boot backend</h4>
              <p className="text-sm text-gray-600 mt-1">Create the project with Spring Initializr, add dependencies, set up MySQL, and run schema.sql.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">2</div>
            <div>
              <h4 className="font-medium text-gray-900">Install axios in the frontend</h4>
              <CodeBlock language="bash" title="Terminal" code={`npm install axios`} />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">3</div>
            <div>
              <h4 className="font-medium text-gray-900">Create lib/api.ts</h4>
              <p className="text-sm text-gray-600 mt-1">Copy the API client code from the Frontend Architecture section above.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">4</div>
            <div>
              <h4 className="font-medium text-gray-900">Update each component</h4>
              <p className="text-sm text-gray-600 mt-1">Replace synchronous localStorage calls with async API calls.</p>
              <CodeBlock
                language="tsx"
                title="Example: Dashboard.tsx migration"
                code={`// BEFORE (localStorage)
import { storage } from '../lib/storage';

const loadData = () => {
  setProducts(storage.getProducts());
  setInventory(storage.getInventory());
};

// AFTER (REST API)
import { getDashboardData } from '../lib/api';

const loadData = async () => {
  try {
    const data = await getDashboardData();
    setTotalProducts(data.totalProducts);
    setTotalLocations(data.totalLocations);
    setTotalUnits(data.totalUnits);
    setTopLocations(data.topLocations);
  } catch (error) {
    console.error('Failed to load dashboard:', error);
  }
};`}
              />
              <CodeBlock
                language="tsx"
                title="Example: TransferInventory.tsx migration"
                code={`// BEFORE
const result = storage.transferInventory(
  productCode, fromLocation, toLocation, qty
);
if (result.success) { ... }

// AFTER
try {
  const result = await transferInventory({
    productCode, fromLocation, toLocation, quantity: qty
  });
  setStatus('success');
  setMessage(result.message);
  loadData(); // refresh
} catch (error: any) {
  setStatus('error');
  setMessage(error.response?.data?.message || 'Transfer failed');
}`}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">5</div>
            <div>
              <h4 className="font-medium text-gray-900">Add .env file</h4>
              <p className="text-sm text-gray-600 mt-1">Create <code className="bg-gray-100 px-1 rounded">.env</code> with <code className="bg-gray-100 px-1 rounded">VITE_API_BASE_URL=http://localhost:8080/api</code></p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">6</div>
            <div>
              <h4 className="font-medium text-gray-900">Test end-to-end</h4>
              <p className="text-sm text-gray-600 mt-1">Start MySQL, Spring Boot (port 8080), and React dev server (port 5173). Verify all CRUD and transfer operations.</p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Build & Run Commands">
        <CodeBlock
          language="bash"
          title="Full Stack Start Commands"
          code={`# ─── 1. Database ───────────────────────────────────────────
mysql -u root -p < schema.sql
mysql -u root -p warehouse_inventory < data.sql

# ─── 2. Backend (Spring Boot) ─────────────────────────────
cd my-spring-project
mvn clean install           # compile + run tests
mvn spring-boot:run         # starts on http://localhost:8080

# ─── 3. Frontend (React) ──────────────────────────────────
cd my-react-app
npm install
npm run dev                 # starts on http://localhost:5173

# ─── Verify ───────────────────────────────────────────────
# Swagger UI:  http://localhost:8080/swagger-ui.html
# React App:   http://localhost:5173
# API Health:  curl http://localhost:8080/api/products`}
        />
      </CollapsibleSection>
    </div>
  );
}

function DevDiarySection() {
  const phases: {
    day: string;
    title: string;
    color: 'blue' | 'green' | 'purple';
    tasks: { text: string; done: boolean }[];
    hours: string;
  }[] = [
    {
      day: 'Day 1',
      title: 'Foundation & Database',
      color: 'blue',
      tasks: [
        { text: 'Set up MySQL database with schema.sql (product, inventory, transfer_log tables)', done: true },
        { text: 'Initialize Spring Boot project with Spring Initializr (Web, JPA, MySQL, Validation)', done: true },
        { text: 'Create Entity classes (Product, Inventory, TransferLog) with JPA annotations', done: true },
        { text: 'Create Repository interfaces with custom query methods', done: true },
        { text: 'Create DTO classes for API request/response payloads', done: true },
        { text: 'Configure application.yml (datasource, JPA, CORS)', done: true },
        { text: 'Add seed data and verify with MySQL Workbench / CLI', done: true },
        { text: 'Set up React project with Vite + TypeScript + Tailwind CSS', done: true },
        { text: 'Create basic routing structure with React Router', done: true },
        { text: 'Build Layout component with navigation bar', done: true },
      ],
      hours: '~30 mins',
    },
    {
      day: 'Day 2',
      title: 'Core Features & API',
      color: 'green',
      tasks: [
        { text: 'Implement ProductService and ProductController (CRUD)', done: true },
        { text: 'Implement InventoryService and InventoryController (list, search)', done: true },
        { text: 'Implement TransferService with @Transactional and validation', done: true },
        { text: 'Implement CsvImportService for multipart CSV file upload', done: true },
        { text: 'Build Dashboard page (stats, top locations, quick actions)', done: true },
        { text: 'Build ImportData page (CSV upload with drag/drop, template downloads)', done: true },
        { text: 'Build ViewInventory page (search by code, grouped display)', done: true },
        { text: 'Build TransferInventory page (form, validation, preview panel)', done: true },
        { text: 'Create lib/api.ts Axios client to replace localStorage calls', done: true },
        { text: 'Test all API endpoints using Swagger UI and Postman', done: true },
      ],
      hours: '~1.5 hours',
    },
    {
      day: 'Day 3',
      title: 'Testing, Polish & Documentation',
      color: 'purple',
      tasks: [
        { text: 'Write JUnit 5 unit tests for TransferService (7 tests: success, edge cases, exceptions)', done: true },
        { text: 'Write JUnit 5 unit tests for ProductService (9 tests: import, upsert, search, mapping)', done: true },
        { text: 'Write integration tests for all 4 controllers using @SpringBootTest + MockMvc (27 tests)', done: true },
        { text: 'Enhance GlobalExceptionHandler: HandlerMethodValidationException, DataIntegrityViolationException', done: true },
        { text: 'Add input validation (@NotBlank, @Positive, etc.) on DTOs — 43 tests passing', done: true },
        { text: 'Polish frontend UI (responsive layout, loading states, error feedback)', done: true },
        { text: 'Create comprehensive full-stack documentation page', done: true },
        { text: 'Write README.md with build/test/start instructions', done: true },
        { text: 'Final end-to-end testing (CSV import -> view inventory -> transfer)', done: true },
        { text: 'Code cleanup, remove unused localStorage code', done: true },
      ],
      hours: '~26 mins',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">3-Day Development Diary</h2>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
        <p className="font-semibold mb-1">✅ All tasks complete — 43/43 tests passing</p>
        <p>Full-stack implementation from database schema to tested REST API to production-ready React frontend.</p>
      </div>

      {phases.map((day) => {
        const doneCount = day.tasks.filter((t) => t.done).length;
        return (
          <div key={day.title} className={`bg-${day.color}-50 border border-${day.color}-200 rounded-lg overflow-hidden`}>
            <div className={`bg-${day.color}-100 px-6 py-4 border-b border-${day.color}-200`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-lg font-bold text-${day.color}-900`}>{day.day}: {day.title}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium text-${day.color}-700`}>
                    {doneCount}/{day.tasks.length} done
                  </span>
                  <span className={`text-sm text-${day.color}-700 bg-${day.color}-200 px-3 py-1 rounded-full`}>
                    {day.hours}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4">
              <ul className="space-y-2 text-sm">
                {day.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2">
                    {task.done ? (
                      <span className="mt-0.5 flex-shrink-0 text-green-600">✓</span>
                    ) : (
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-${day.color}-400 flex-shrink-0`} />
                    )}
                    <span className={task.done ? 'text-gray-700' : `text-${day.color}-800`}>
                      {task.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────

export function Documentation() {
  const [activeSection, setActiveSection] = useState<Section>('overview');

  const sections: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Layers className="h-4 w-4" /> },
    { id: 'database', label: 'Database (MySQL)', icon: <Database className="h-4 w-4" /> },
    { id: 'backend', label: 'Backend (Spring Boot)', icon: <Server className="h-4 w-4" /> },
    { id: 'api', label: 'REST API Reference', icon: <GitBranch className="h-4 w-4" /> },
    { id: 'frontend', label: 'Frontend (React)', icon: <Monitor className="h-4 w-4" /> },
    { id: 'migration', label: 'Migration Guide', icon: <FileCode className="h-4 w-4" /> },
    { id: 'devdiary', label: 'Dev Diary', icon: <FolderTree className="h-4 w-4" /> },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <OverviewSection />;
      case 'database': return <DatabaseSection />;
      case 'backend': return <BackendSection />;
      case 'api': return <ApiSection />;
      case 'frontend': return <FrontendSection />;
      case 'migration': return <MigrationSection />;
      case 'devdiary': return <DevDiarySection />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Book className="h-8 w-8 text-blue-600" />
          Full-Stack Documentation
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Complete technical documentation for Frontend (React) + Backend (Spring Boot) + Database (MySQL)
        </p>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {section.icon}
            {section.label}
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div>{renderSection()}</div>
    </div>
  );
}
