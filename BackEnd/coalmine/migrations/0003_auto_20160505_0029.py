# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-05-04 16:29
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('coalmine', '0002_auto_20160430_1347'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='artical',
            options={'ordering': ('-modified',)},
        ),
    ]