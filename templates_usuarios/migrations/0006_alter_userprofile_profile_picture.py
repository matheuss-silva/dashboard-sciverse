# Generated by Django 4.2.6 on 2023-11-26 06:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('templates_usuarios', '0005_remove_userprofile_website_url_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_picture',
            field=models.ImageField(blank=True, default='templates_user\\static\\perfil.png', null=True, upload_to='profile_pictures/', verbose_name='Profile Picture'),
        ),
    ]
