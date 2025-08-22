from djongo import models

class Team(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100, unique=True)
    
    class Meta:
        db_table = 'teams'
        
    def __str__(self):
        return self.name

class User(models.Model):
    _id = models.ObjectIdField()
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    team_name = models.CharField(max_length=100)
    
    class Meta:
        db_table = 'users'
        
    def __str__(self):
        return self.email

class Activity(models.Model):
    _id = models.ObjectIdField()
    user_email = models.EmailField()
    type = models.CharField(max_length=50)
    duration = models.IntegerField()  # in minutes
    calories = models.IntegerField()
    date = models.DateField()
    
    class Meta:
        db_table = 'activities'

class Workout(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100)
    description = models.TextField()
    difficulty = models.CharField(max_length=50)
    
    class Meta:
        db_table = 'workouts'
        
    def __str__(self):
        return self.name

class Leaderboard(models.Model):
    _id = models.ObjectIdField()
    user_email = models.EmailField()
    score = models.IntegerField()
    
    class Meta:
        db_table = 'leaderboard'
