from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from datetime import date, timedelta
import random

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting database population...'))
        
        # Clear existing data
        self.stdout.write('Clearing existing data...')
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()
        
        # Create teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(name='Team Marvel')
        team_dc = Team.objects.create(name='Team DC')
        
        # Create superhero users
        self.stdout.write('Creating superhero users...')
        
        # Marvel superheroes
        marvel_heroes = [
            {'email': 'tony.stark@avengers.com', 'name': 'Tony Stark'},
            {'email': 'steve.rogers@avengers.com', 'name': 'Steve Rogers'},
            {'email': 'natasha.romanoff@avengers.com', 'name': 'Natasha Romanoff'},
            {'email': 'bruce.banner@avengers.com', 'name': 'Bruce Banner'},
            {'email': 'thor.odinson@asgard.com', 'name': 'Thor Odinson'},
            {'email': 'peter.parker@spiderman.com', 'name': 'Peter Parker'},
        ]
        
        # DC superheroes
        dc_heroes = [
            {'email': 'clark.kent@dailyplanet.com', 'name': 'Clark Kent'},
            {'email': 'bruce.wayne@wayneenterprises.com', 'name': 'Bruce Wayne'},
            {'email': 'diana.prince@themyscira.com', 'name': 'Diana Prince'},
            {'email': 'barry.allen@ccpd.com', 'name': 'Barry Allen'},
            {'email': 'arthur.curry@atlantis.com', 'name': 'Arthur Curry'},
            {'email': 'hal.jordan@greenlantern.com', 'name': 'Hal Jordan'},
        ]
        
        marvel_users = []
        dc_users = []
        
        for hero in marvel_heroes:
            user = User.objects.create(
                email=hero['email'],
                name=hero['name'],
                team_name='Team Marvel'
            )
            marvel_users.append(user)
            
        for hero in dc_heroes:
            user = User.objects.create(
                email=hero['email'],
                name=hero['name'],
                team_name='Team DC'
            )
            dc_users.append(user)
        
        all_users = marvel_users + dc_users
        
        # Create workouts
        self.stdout.write('Creating workouts...')
        workouts = [
            {'name': 'Super Strength Training', 'description': 'Build incredible strength like a superhero', 'difficulty': 'Hard'},
            {'name': 'Speed Training', 'description': 'Lightning fast cardio workout', 'difficulty': 'Medium'},
            {'name': 'Flexibility & Agility', 'description': 'Improve flexibility and agility', 'difficulty': 'Easy'},
            {'name': 'Hero Endurance Challenge', 'description': 'Ultimate endurance test for heroes', 'difficulty': 'Hard'},
            {'name': 'Combat Training', 'description': 'Practice fighting techniques', 'difficulty': 'Medium'},
            {'name': 'Flying Practice', 'description': 'Aerial maneuvers and flying skills', 'difficulty': 'Easy'},
        ]
        
        for workout_data in workouts:
            Workout.objects.create(**workout_data)
        
        # Create activities
        self.stdout.write('Creating activities...')
        activity_types = ['running', 'strength training', 'swimming', 'cycling', 'flying', 'combat training']
        
        for user in all_users:
            # Create 5-10 random activities for each user
            num_activities = random.randint(5, 10)
            for i in range(num_activities):
                activity_date = date.today() - timedelta(days=random.randint(1, 30))
                Activity.objects.create(
                    user_email=user.email,
                    type=random.choice(activity_types),
                    duration=random.randint(15, 120),  # 15-120 minutes
                    calories=random.randint(100, 800),  # 100-800 calories
                    date=activity_date
                )
        
        # Create leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        for user in all_users:
            # Calculate score based on total calories burned
            user_activities = Activity.objects.filter(user_email=user.email)
            total_calories = sum(activity.calories for activity in user_activities)
            Leaderboard.objects.create(
                user_email=user.email,
                score=total_calories + random.randint(0, 500)  # Add some randomness
            )
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully populated database with:\n'
                f'- {Team.objects.count()} teams\n'
                f'- {User.objects.count()} users\n'
                f'- {Activity.objects.count()} activities\n'
                f'- {Workout.objects.count()} workouts\n'
                f'- {Leaderboard.objects.count()} leaderboard entries'
            )
        )
