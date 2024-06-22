// Machine Learning Overview



Classification
Definition: Classification is used to predict a categorical target variable 
based on one or more input features.

Key Algorithms:

Logistic Regression
k-Nearest Neighbors (k-NN)
Support Vector Machine (SVM)
Decision Tree Classification
Random Forest Classification
Gradient Boosting Classification
Logistic Regression
Concept: Logistic regression models the probability of a binary outcome as a function of the input features.

Equation: 

Example: Classifying whether an email is spam or not spam.

python
Copy code
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# Load dataset
data = load_iris()
X = data.data
y = (data.target == 2).astype(int)  # Convert to binary classification (Iris-Virginica or not)

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and fit the model
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)

# Predictions
predictions = model.predict(X_test)

# Model accuracy
accuracy = model.score(X_test, y_test)
print(f'Accuracy: {accuracy * 100:.2f}%')
k-Nearest Neighbors (k-NN)
Concept: k-NN classifies a data point based on the majority class among its k nearest neighbors in the feature space.

Example: Classifying types of flowers based on petal and sepal measurements.

python
Copy code
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

# Load dataset
data = load_iris()
X = data.data
y = data.target

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and fit the model
model = KNeighborsClassifier(n_neighbors=3)
model.fit(X_train, y_train)

# Predictions
predictions = model.predict(X_test)

# Model accuracy
accuracy = model.score(X_test, y_test)
print(f'Accuracy: {accuracy * 100:.2f}%')
Support Vector Machine (SVM)
Concept: SVM finds the hyperplane that best separates different classes in the feature space.

Example: Classifying different types of iris flowers.

python
Copy code
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

# Load dataset
data = load_iris()
X = data.data
y = data.target

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and fit the model
model = SVC(kernel='linear')
model.fit(X_train, y_train)

# Predictions
predictions = model.predict(X_test)

# Model accuracy
accuracy = model.score(X_test, y_test)
print(f'Accuracy: {accuracy * 100:.2f}%')










Regression
Definition: Regression is used to predict a continuous target variable based on one or more input features.

Key Algorithms:

Linear Regression
Polynomial Regression
Support Vector Regression (SVR)
Decision Tree Regression
Random Forest Regression
Gradient Boosting Regression
Linear Regression
Concept: Linear regression attempts to model the relationship between two variables by fitting a linear equation to the observed data.

Equation: 
𝑦
=
𝛽
0
+
𝛽
1
𝑥
+
𝜖
y=β 
0
​
 +β 
1
​
 x+ϵ

𝑦
y: dependent variable
𝑥
x: independent variable
𝛽
0
β 
0
​
 : intercept
𝛽
1
β 
1
​
 : slope
𝜖
ϵ: error term
Example: Predicting house prices based on size.

python
Copy code
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Sample data
X = np.array([[600], [800], [1000], [1200], [1400]])  # Size of house in square feet
y = np.array([150000, 200000, 250000, 300000, 350000])  # Price of house

# Create and fit the model
model = LinearRegression()
model.fit(X, y)

# Predictions
predictions = model.predict(X)

# Plotting
plt.scatter(X, y, color='blue')
plt.plot(X, predictions, color='red')
plt.xlabel('Size of house (sq ft)')
plt.ylabel('Price of house')
plt.title('Linear Regression Example')
plt.show()
Polynomial Regression
Concept: Polynomial regression fits a polynomial equation to the data.

Equation: 
𝑦
=
𝛽
0
+
𝛽
1
𝑥
+
𝛽
2
𝑥
2
+
.
.
.
+
𝛽
𝑛
𝑥
𝑛
+
𝜖
y=β 
0
​
 +β 
1
​
 x+β 
2
​
 x 
2
 +...+β 
n
​
 x 
n
 +ϵ

Example: Predicting house prices with a more complex relationship.

python
Copy code
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression

# Sample data
X = np.array([[600], [800], [1000], [1200], [1400]])  # Size of house in square feet
y = np.array([150000, 195000, 265000, 290000, 350000])  # Price of house

# Transform the data
poly = PolynomialFeatures(degree=2)
X_poly = poly.fit_transform(X)

# Create and fit the model
model = LinearRegression()
model.fit(X_poly, y)

# Predictions
predictions = model.predict(X_poly)

# Plotting
plt.scatter(X, y, color='blue')
plt.plot(X, predictions, color='red')
plt.xlabel('Size of house (sq ft)')
plt.ylabel('Price of house')
plt.title('Polynomial Regression Example')
plt.show()
