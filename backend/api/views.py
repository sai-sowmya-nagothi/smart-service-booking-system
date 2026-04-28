from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, generics
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Booking
from .serializers import BookingSerializer


# Register API
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

# Services API
class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

# Booking API (Protected)

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)