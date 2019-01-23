class Player:
    name = ""
    team = ""

    class Offense:
        class FirstServe:
            on = 0
            total = 0
            percentage = on / total
            aces = 0
            pockets = 0

        class SecondServe:
            on = 0
            total = 0
            percentage = on / total
            aces = 0
            pockets = 0

        total_aces = FirstServe.aces + SecondServe.aces
        num_breaks = 0
        hits_on = 0
        hits_total = 0
        kills = 0
        hit_percentage = hits_on / hits_total
        kill_percentage = kills / hits_on

    class Defense:
        aced = 0
        # t = defensive touch
        t_on_first = 0
        t_on_second = 0
        def_ts = 0
        def_t_no_return = 0

    def __init__(self):
        self.name = input()

    def first_serve_ace(self):
        self.Offense.FirstServe.aces += 1
        self.num_breaks += 1
        self.Offense.FirstServe.on += 1

    def second_serve_ace(self):
        self.Offense.SecondServe.aces += 1
        self.num_breaks += 1
        self.Offense.SecondServe.on += 1
