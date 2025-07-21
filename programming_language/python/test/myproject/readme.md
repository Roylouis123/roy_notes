python3 -m venv env   to create a seprate environment

source env/bin/activate   to activate env

pip install django

django-admin startproject myproject


// routes 
path('about/<id>', views.aboutUS),  //any 
path('about/<str:id>', views.aboutUS),  // only str
path('about/<int:id>', views.aboutUS),  // number
path('about/<slug:id>', views.aboutUS),  //
