# Generated by Django 4.0.4 on 2022-05-14 19:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0002_auto_20210215_1518'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='message',
            field=models.TextField(blank=True, max_length=500),
        ),
        migrations.AlterField(
            model_name='lead',
            name='name',
            field=models.CharField(max_length=250),
        ),
    ]
