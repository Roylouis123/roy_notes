from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from datetime import datetime

# Initialize FastAPI app
app = FastAPI(
    title="FastAPI Demo",
    description="A simple FastAPI backend server",
    version="1.0.0"
)

# Mock database (in-memory)
USERS_DB = [
    {"id": 1, "username": "john_doe", "email": "john@example.com", "active": True, "created_at": "2023-01-01T00:00:00"},
    {"id": 2, "username": "jane_smith", "email": "jane@example.com", "active": True, "created_at": "2023-01-02T00:00:00"},
    {"id": 3, "username": "bob_johnson", "email": "bob@example.com", "active": False, "created_at": "2023-01-03T00:00:00"}
]

PRODUCTS_DB = [
    {"id": 1, "name": "Laptop", "price": 999.99, "inventory": 10, "category": "electronics"},
    {"id": 2, "name": "Smartphone", "price": 699.99, "inventory": 15, "category": "electronics"},
    {"id": 3, "name": "Headphones", "price": 149.99, "inventory": 20, "category": "accessories"},
    {"id": 4, "name": "Coffee Mug", "price": 12.99, "inventory": 50, "category": "household"}
]

# Pydantic models for data validation
class User(BaseModel):
    username: str
    email: str
    active: bool = True

class UserResponse(User):
    id: int
    created_at: str

class UserCreate(User):
    pass

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    active: Optional[bool] = None

class Product(BaseModel):
    name: str
    price: float
    inventory: int
    category: str

class ProductResponse(Product):
    id: int

class ProductCreate(Product):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    inventory: Optional[int] = None
    category: Optional[str] = None

# Root endpoint
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the FastAPI Demo API", "status": "running"}

# User endpoints
@app.get("/users", response_model=List[UserResponse], tags=["Users"])
async def get_users():
    return USERS_DB

@app.get("/users/{user_id}", response_model=UserResponse, tags=["Users"])
async def get_user(user_id: int):
    for user in USERS_DB:
        if user["id"] == user_id:
            return user
    raise HTTPException(status_code=404, detail=f"User with ID {user_id} not found")

@app.post("/users", response_model=UserResponse, status_code=status.HTTP_201_CREATED, tags=["Users"])
async def create_user(user: UserCreate):
    if any(u["email"] == user.email for u in USERS_DB):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_id = max(u["id"] for u in USERS_DB) + 1 if USERS_DB else 1
    created_at = datetime.now().isoformat()
    
    new_user = {
        "id": new_id,
        **user.dict(),
        "created_at": created_at
    }
    
    USERS_DB.append(new_user)
    return new_user

@app.put("/users/{user_id}", response_model=UserResponse, tags=["Users"])
async def update_user(user_id: int, user_update: UserUpdate):
    for i, user in enumerate(USERS_DB):
        if user["id"] == user_id:
            # Only update fields that are provided
            update_data = {k: v for k, v in user_update.dict().items() if v is not None}
            USERS_DB[i] = {**user, **update_data}
            return USERS_DB[i]
    
    raise HTTPException(status_code=404, detail=f"User with ID {user_id} not found")

@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Users"])
async def delete_user(user_id: int):
    for i, user in enumerate(USERS_DB):
        if user["id"] == user_id:
            USERS_DB.pop(i)
            return
    
    raise HTTPException(status_code=404, detail=f"User with ID {user_id} not found")

# Product endpoints
@app.get("/products", response_model=List[ProductResponse], tags=["Products"])
async def get_products(category: Optional[str] = None):
    if category:
        return [p for p in PRODUCTS_DB if p["category"] == category]
    return PRODUCTS_DB

@app.get("/products/{product_id}", response_model=ProductResponse, tags=["Products"])
async def get_product(product_id: int):
    for product in PRODUCTS_DB:
        if product["id"] == product_id:
            return product
    raise HTTPException(status_code=404, detail=f"Product with ID {product_id} not found")

@app.post("/products", response_model=ProductResponse, status_code=status.HTTP_201_CREATED, tags=["Products"])
async def create_product(product: ProductCreate):
    new_id = max(p["id"] for p in PRODUCTS_DB) + 1 if PRODUCTS_DB else 1
    
    new_product = {
        "id": new_id,
        **product.dict()
    }
    
    PRODUCTS_DB.append(new_product)
    return new_product

@app.put("/products/{product_id}", response_model=ProductResponse, tags=["Products"])
async def update_product(product_id: int, product_update: ProductUpdate):
    for i, product in enumerate(PRODUCTS_DB):
        if product["id"] == product_id:
            # Only update fields that are provided
            update_data = {k: v for k, v in product_update.dict().items() if v is not None}
            PRODUCTS_DB[i] = {**product, **update_data}
            return PRODUCTS_DB[i]
    
    raise HTTPException(status_code=404, detail=f"Product with ID {product_id} not found")

@app.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Products"])
async def delete_product(product_id: int):
    for i, product in enumerate(PRODUCTS_DB):
        if product["id"] == product_id:
            PRODUCTS_DB.pop(i)
            return
    
    raise HTTPException(status_code=404, detail=f"Product with ID {product_id} not found")

# Search endpoint (demonstration of more complex filtering)
@app.get("/search", tags=["Search"])
async def search(q: str, category: Optional[str] = None, min_price: Optional[float] = None, max_price: Optional[float] = None):
    results = []
    
    # Search in products
    for product in PRODUCTS_DB:
        if q.lower() in product["name"].lower():
            # Apply filters
            if category and product["category"] != category:
                continue
            if min_price is not None and product["price"] < min_price:
                continue
            if max_price is not None and product["price"] > max_price:
                continue
            
            results.append({
                "type": "product",
                "id": product["id"],
                "name": product["name"],
                "price": product["price"],
                "category": product["category"]
            })
    
    # Search in users (just for demonstration)
    for user in USERS_DB:
        if q.lower() in user["username"].lower() or q.lower() in user["email"].lower():
            results.append({
                "type": "user",
                "id": user["id"],
                "username": user["username"],
                "email": user["email"]
            })
    
    return {"query": q, "results": results, "count": len(results)}

# Run the server if the file is executed directly
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
