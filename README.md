# 🍷 Wine Review Analysis and Database Project

This project transforms a dataset of over 120,000 wine reviews from *Wine Enthusiast* magazine into a structured, queryable relational database. It focuses on data normalization, storage, and web-based interaction to uncover insights about the world’s finest wines.

---

## 📚 Table of Contents  
1. [Project Overview](#project-overview)  
2. [Dataset](#dataset)  
3. [Data Cleaning](#data-cleaning)  
4. [Database Design](#database-design)  
5. [Web Application](#web-application)  
6. [Tech Stack](#tech-stack)  
7. [Installation & Setup](#installation-and-setup)  
8. [Key Learnings](#key-learnings)  
9. [Future Enhancements](#future-enhancements)  
10. [Contact](#contact)  

---

## 📌 Project Overview <a id="project-overview"></a>

The goal of this project was to efficiently **store**, **analyze**, and **present** wine review data through:

- **🔍 Data Analysis** – Cleaning and preprocessing using Python and pandas  
- **🗃️ Database Design** – Creating a normalized schema and implementing it in MySQL  
- **📊 SQL Analytics** – Writing SQL queries for insight extraction  
- **🌐 Web App Development** – A simple UI for wine exploration  

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

## 🚀 Installation & Setup <a id="installation-and-setup"></a>

```bash
# Clone repository
git clone https://github.com/yourusername/wine-reviews-db.git

# Set up MySQL
mysql -u root -p < setup-database.sql

# Load and ingest data
mysql -u wine_user -p < create-tables.sql
mysql -u wine_user -p < load-dnorm-data.sql
mysql -u wine_user -p < ingest-data.sql
```

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



