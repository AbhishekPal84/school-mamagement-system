from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import GalleryImage, Student
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json

@csrf_exempt
def login_user(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user is not None:
            login(request, user)

            return JsonResponse({
                "message": "Login successful",
                "is_staff": user.is_staff
            })

        return JsonResponse({
            "error": "Invalid username or password"
        }, status=401)

    return JsonResponse({
        "error": "Method not allowed"
    }, status=405)
    
@csrf_exempt
def register_student(request):
    if request.method != "POST":
        return JsonResponse(
            {"error": "Method not allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        username = data.get("username", "").strip()
        password = data.get("password", "")
        full_name = data.get("full_name", "").strip()
        father_name = data.get("father_name", "").strip()
        date_of_birth = data.get("date_of_birth", "").strip()
        gender = data.get("gender", "").strip()
        phone = data.get("phone", "").strip()
        email = data.get("email", "").strip().lower()
        address = data.get("address", "").strip()
        class_name = data.get("class_name", "").strip()

        # Required fields check
        if not all([
            username,
            password,
            full_name,
            father_name,
            date_of_birth,
            gender,
            phone,
            email,
            address,
            class_name
        ]):
            return JsonResponse(
                {"error": "All fields are required"},
                status=400
            )

        # Username already exists
        if User.objects.filter(username=username).exists():
            return JsonResponse(
                {"error": "Username already exists"},
                status=400
            )

        # Email already exists
        if Student.objects.filter(email=email).exists():
            return JsonResponse(
                {"error": "Email already registered"},
                status=400
            )

        # Password length
        if len(password) < 6:
            return JsonResponse(
                {"error": "Password must be at least 6 characters"},
                status=400
            )

        # Create Django User with secure password
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email
        )

        # Create Student profile
        student = Student.objects.create(
            username=username,
            full_name=full_name,
            father_name=father_name,
            date_of_birth=date_of_birth,
            gender=gender,
            phone=phone,
            email=email,
            address=address,
            class_name=class_name
        )

        return JsonResponse({
            "message": "Student registration successful",
            "student_id": student.id,
            "username": student.username
        }, status=201)

    except json.JSONDecodeError:
        return JsonResponse(
            {"error": "Invalid JSON data"},
            status=400
        )

    except Exception as e:
        return JsonResponse(
            {"error": str(e)},
            status=500
        )
    
    
@csrf_exempt
def gallery_images(request):

    # ================= GET =================
    if request.method == "GET":
        images = GalleryImage.objects.all().order_by("-created_at")

        data = []

        for image in images:
            data.append({
                "id": image.id,
                "title": image.title,
                "description": image.description,
                "image": request.build_absolute_uri(image.image.url),
                "created_at": image.created_at,
            })

        return JsonResponse(data, safe=False)


    # ================= POST / UPLOAD =================
    if request.method == "POST":

        title = request.POST.get("title")
        description = request.POST.get("description")
        image_file = request.FILES.get("image")

        if not title:
            return JsonResponse(
                {"error": "Title required"},
                status=400
            )

        if not image_file:
            return JsonResponse(
                {"error": "Image file required"},
                status=400
            )

        gallery_image = GalleryImage.objects.create(
            title=title,
            description=description,
            image=image_file
        )

        return JsonResponse({
            "message": "Image uploaded successfully",
            "id": gallery_image.id,
            "title": gallery_image.title,
            "description": gallery_image.description,
            "image": request.build_absolute_uri(
                gallery_image.image.url
            )
        }, status=201)


    # ================= DELETE =================
    if request.method == "DELETE":

        image_id = request.GET.get("id")

        if not image_id:
            return JsonResponse(
                {"error": "Image ID required"},
                status=400
            )

        try:
            gallery_image = GalleryImage.objects.get(id=image_id)
        except GalleryImage.DoesNotExist:
            return JsonResponse(
                {"error": "Image not found"},
                status=404
            )

        # image file bhi delete karo
        if gallery_image.image:
            gallery_image.image.delete(save=False)

        gallery_image.delete()

        return JsonResponse({
            "message": "Image deleted successfully"
        })


    return JsonResponse(
        {"error": "Method not allowed"},
        status=405
    )

@api_view(["POST"])
def reset_password(request):
    username = request.data.get("username")
    new_password = request.data.get("new_password")

    if not username or not new_password:
        return Response(
            {"error": "Username and new password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(username=username)

        user.set_password(new_password)
        user.save()

        return Response({
            "message": "Password reset successfully"
        })

    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )