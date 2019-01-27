from django.shortcuts import render

games = [
    {
        'players': 'Jake, Zach, Hayden and Trey',
        'game': 'Game 1',
        'stats': 'Stats:',
        'date_played': 'January 27, 2019'
    },
    {
        'players': 'Jake, Zach, Hayden and Trey',
        'game': 'Game 2',
        'stats': 'Stats:',
        'date_played': 'January 28, 2019'
    }
]


def home(request):
    # makes a dictionary with a key 'games' to access
    # game info in games dictionary above, then displays
    # it on the home page
    context = {
        'games': games
    }
    return render(request, 'spike_stats/home.html', context)


def about(request):
    return render(request, 'spike_stats/about.html',
                  {'game': 'Game 1 about'})


