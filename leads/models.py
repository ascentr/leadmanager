from django.db import models
from django.contrib.auth.models import User
from django.forms import CharField

class Lead(models.Model):
    name = models.CharField(max_length=250)
    email = models.EmailField(max_length=100, unique=True)




    message = models.TextField(max_length=500, blank=True)


        # CLIENT_TYPE = [
    #     ('Surgery' , 'Surgery'),
    #     ('Clinic' , 'Clinic'),
    #     ('Hospital' , 'Hosplital'),
    #     ('Pharmacy', 'Pharmacy'),
    #     ('Educational', 'Educational'),
    #     ('Other', 'Other')
    # ]

    # client_type = models.CharField(max_length=15, choices=CLIENT_TYPE, blank=True)
    # notes = models.TextField(max_length=750, blank=True)
    # meeting_date = models.DateField(blank=True)
    # meeting_time = models.TimeField(blank=True)
    # duration = models.IntegerField(blank=True)
    # Products = models.TextField

    owner = models.ForeignKey(User, related_name="leads", on_delete=models.CASCADE, null=True )
    created_at = models.DateTimeField(auto_now_add=True)

