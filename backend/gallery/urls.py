from django.urls import path
from .views import gallery_images, login_user, reset_password, register_student


urlpatterns = [
    path("images/", gallery_images, name="gallery-images"),
    path("login/", login_user, name="login"),
    path("reset-password/", reset_password, name="reset-password"),
    path("register/", register_student, name="register-student"),
]