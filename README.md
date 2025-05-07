# 🍷 Wine Review Analysis and Database Project
    
    Databases and Advanced Data Techniques Midterm Coursework

`Data Normalization · SQL Analytics · Web Visualization · Database Design · ETL Pipeline`

This project transforms a dataset of over 120,000 wine reviews from *Wine Enthusiast* magazine into a structured, queryable relational database. It focuses on data normalization, storage, and web-based interaction to uncover insights about the world’s finest wines.

[zynicide/wine-reviews/winemag-data-130k-v2.csv](https://www.kaggle.com/datasets/zynicide/wine-reviews)
> ![Kaggle](https://img.shields.io/badge/Kaggle-035a7d?style=for-the-badge&logo=kaggle&logoColor=white)

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat-square&logo=pandas&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)

---

## 📚 Table of Contents  
1. [Project Overview](#project-overview)
2. [Repository Structure](#repo-struct)
3. [Wine Reviews Application Structure](#folder-struct)
4. [Dataset](#dataset)  
5. [Data Cleaning](#data-cleaning)  
6. [Database Design](#database-design)  
7. [Web Application](#web-application)  
8. [Tech Stack](#tech-stack)  
9. [Installation & Setup](#installation-and-setup)  
10. [Key Learnings](#key-learnings)  
11. [Future Enhancements](#future-enhancements)  
12. [Contact](#contact)  

---

## 📌 Project Overview <a id="project-overview"></a>

The goal of this project was to efficiently **store**, **analyze**, and **present** wine review data through:

- **🔍 Data Analysis** – Cleaning and preprocessing using Python and pandas  
- **🗃️ Database Design** – Creating a normalized schema and implementing it in MySQL  
- **📊 SQL Analytics** – Writing SQL queries for insight extraction  
- **🌐 Web App Development** – A simple UI for wine exploration  

---

## 📂 Repository Structure <a id="repo-struct"></a>
```
Interactive-Wine-Review-Data-Insights/
├── .gitignore                  
├── README.md                   
├── Coursework_Report.pdf            # Project report documentation
├── winemag_data_normalization.ipynb # Jupyter notebook for data cleaning and normalization process
├── ERD_images/                      # Entity Relationship Diagram, Relational Schema Images
└── wine_reviews/                    # Core project files for the wine review analysis system
```

## 📁 Wine Reviews Application Structure <a id="folder-struct"></a>
```
wine_reviews/
├── data/
│   └── winemag-records.csv         # Wine review dataset CSV (extracted from original dataset)
│
└── application/                
    ├── scripts/                    # SQL scripts for database setup and data loading
    │   ├── setup-database.sql      # Creates wine_reviews database and user
    │   ├── create-tables.sql       # Defines normalized database schema
    │   ├── load-dnorm-data.sql     # Loads denormalized data from CSV
    │   └── ingest-data.sql         # Transforms and loads data into normalized tables
    │
    └── web-app/                    # Web application for displaying wine data insights
        ├── app.js                  # Express.js application entry point
        ├── package.json            # Node.js package configuration
        ├── package-lock.json       # Locked dependencies for consistent installs
        │
        └── templates/              # HTML templates for web pages
            ├── home.html           # Homepage with navigation to different views
            ├── reviews.html        # Displays highest rated wine reviews
            ├── varieties.html      # Shows wine varieties statistics
            ├── countries.html      # Displays highest rated wines by country
            ├── wineries.html       # Lists top wineries with review statistics
            └── locations.html      # Shows location statistics by country
```

---

## 🗃️ Dataset <a id="dataset"></a>

- Source: [Wine Reviews on Kaggle](https://www.kaggle.com/datasets/zynicide/wine-reviews)  
- Origin: Reviews scraped from [Wine Enthusiast](https://www.wineenthusiast.com/ratings/)  
- Total Records: ~130,000  
- Features:  
  - Country, Province, Region, Price, Points, Taster, Variety, Winery, Description, and more  

#### 📋 Fields Overview

| Field | Description |
|-------|-------------|
| `country` | Country of origin |
| `description` | Full wine review |
| `designation` | Specific vineyard designation |
| `points` | Score (1–100) |
| `price` | Price per bottle |
| `taster_name` | Wine reviewer |
| `title` | Title with vintage |
| `variety` | Grape type |
| `winery` | Producer |

#### 🧪 Sample Data
![Screenshot](https://github.com/user-attachments/assets/06b8bca6-3d57-48bd-892c-6d0df7d16172)

---

## 🧹 Data Cleaning <a id="data-cleaning"></a>

To prepare the dataset for ingestion and analysis:

### 🔻 Dropped Columns & Null Rows  
- Removed `region_1`, `region_2`, and `price` due to missing values  
- Dropped rows missing critical data  
- *Price was inconsistent and not reliably mapped to wines*

### 🔁 Removed Duplicates  
- Kept only the **highest-rated** review per wine title  
- *Simplified data normalization*

### 📉 Filtered for High Quality  
- Selected only wines with `points > 95`  
- Reduced dataset to ~1,500 rows to optimize for **Colab performance** and **premium wines**

---

## 🗂️ Database Design <a id="database-design"></a>

A normalized relational database was designed to store the refined dataset.

### 📌 Entity-Relationship Diagram  
![ERD](https://github.com/user-attachments/assets/961b607f-484d-4901-be32-3093ecd801de)

### 🧱 Tables

| Table | Description |
|-------|-------------|
| `Locations` | Country, province, winery, designation |
| `Varieties` | Grape type |
| `Tasters` | Reviewer name and Twitter handle |
| `Reviews` | Wine title, description, points, foreign keys |

### 🔗 Relational Schema  
![Schema](https://github.com/user-attachments/assets/5ca8e96c-84b0-4ffa-8b76-79f0f3d0a772)

---

## 🌐 Web Application <a id="web-application"></a>

A lightweight web application was created to explore the dataset.  

### 🔧 Features
- List wines  
- Search by title, variety, or country  
- View wine details and scores  

---

## 📈 Key Insights

### 🏅 Top Premium Wineries

| Winery | Location | Reviews | Avg Points |
|--------|----------|---------|------------|
| Williams Selyem | US, California | 28 | 95.86 |
| Domaine Zind-Humbrecht | France, Alsace | 20 | 95.50 |
| Cayuse | US, Washington | 15 | 96.13 |
| Kracher | Austria, Burgenland | 14 | 96.14 |
| Louis Roederer | France, Champagne | 14 | 95.79 |

### 💯 Perfect Score Wines

Only **9 wines** received a perfect 100-point rating, including:

- *Biondi Santi 2010 Riserva (Italy)*  
- *Casa Ferreirinha 2008 Barca-Velha (Portugal)*  
- *Cayuse 2008 Bionic Frog Syrah (US)*  

### 🍇 Most Reviewed Varieties
```
Pinot Noir      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓           222
Chardonnay      ▓▓▓▓▓▓▓▓▓▓▓                 155
Riesling        ▓▓▓▓▓▓▓▓▓▓▓                 154
Nebbiolo        ▓▓▓▓▓▓▓                     111
Cabernet Sauv.  ▓▓▓▓▓                       79
```

### 🌍 Wine by Country

| Country | Provinces | Wineries | Designations |
|---------|-----------|----------|--------------|
| 🇺🇸 US      | 3         | 211      | 376          |
| 🇫🇷 France  | 10        | 147      | 215          |
| 🇮🇹 Italy   | 8         | 108      | 123          |
| 🇦🇹 Austria | 11        | 27       | 84           |
| 🇵🇹 Portugal| 6         | 39       | 46           |

### 🔎 Featured SQL Query

```sql
-- Highest rated wine per country
WITH RankedReviews AS (
  SELECT
    l.country_name,
    l.province_name,
    r.title AS highest_rated_wine,
    r.points,
    ROW_NUMBER() OVER (PARTITION BY l.country_name ORDER BY r.points DESC) AS rnk
  FROM Locations l
  JOIN Reviews r ON l.location_id = r.location_id
)
SELECT
  country_name AS Country,
  province_name AS Province,
  highest_rated_wine,
  points
FROM RankedReviews
WHERE rnk = 1
ORDER BY points DESC;
```

---

## 💻 Tech Stack <a id="tech-stack"></a>

| Component | Tool |
|-----------|------|
| Data Cleaning | Python + pandas |
| Database | MySQL |
| Querying | SQL |
| Notebook | Jupyter |
| Web App | Node.js, Express, Mustache |

---
<details>
    
<summary><h2> 🚀 Installation & Setup <a id="installation-and-setup"></a> </h2></summary>

### Prerequisites
- MySQL installed on your system
- Node.js and npm installed (for the web application)
- Git (for cloning the repository)

### 1. Clone the Repository
```bash
git clone https://github.com/csanjanar/wine-reviews-db.git
cd wine-reviews-db
```

### 2. Database Setup
1. Run the database setup script (creates wine_reviews database and user):
   ```bash
   mysql -u root -p < wine_reviews/application/scripts/setup-database.sql
   ```

2. Create database tables:
   ```bash
   mysql -u wine_user -p < wine_reviews/application/scripts/create-tables.sql
   ```

3. Load denormalized data from CSV:
   ```bash
   mysql -u wine_user -p < wine_reviews/application/scripts/load-dnorm-data.sql
   ```

4. Transform and load data into normalized tables:
   ```bash
   mysql -u wine_user -p < wine_reviews/application/scripts/ingest-data.sql
   ```

### 3. Web Application Setup
1. Navigate to the web application directory:
   ```bash
   cd wine_reviews/application/web-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   node app.js
   ```

4. Access the application in your browser:
   ```
   http://localhost:3000
   ```

#### Important Notes
- The MySQL user credentials defined in `setup-database.sql` are:
  - Username: `wine_user`
  - Password: `wine_password`
- Make sure ports for MySQL (3306) and the web application (3000) are not in use by other applications
- If you encounter permission issues with MySQL, you may need to run the commands with sudo (Linux/Mac) or as administrator (Windows)

</details>

---

## 🧠 Key Learnings <a id="key-learnings"></a>

- Real-world data cleaning and wrangling  
- Schema design and SQL normalization  
- Web development with backend integration  
- End-to-end delivery of a data-driven project  

---

## 🔮 Future Enhancements <a id="future-enhancements"></a>

- Flavor profile analysis via NLP  
- Correlation between price and quality  
- Interactive dashboard for exploration  
- Vintage-based trends and timelines  
- Advanced filtering and user personalization  

---



