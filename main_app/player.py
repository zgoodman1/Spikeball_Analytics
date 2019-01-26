class Player:
    name = ""
    team = ""

    class Offense:
        class FirstServe:
            on = 0
            total = 0
            percentage = 0
            aces = 0
            pockets = 0

        class SecondServe:
            on = 0
            total = 0
            percentage = 0
            aces = 0
            pockets = 0

        total_aces = FirstServe.aces + SecondServe.aces
        num_breaks = 0
        hits_on = 0
        hits_total = 0
        kills = 0
        hit_percentage = 0
        kill_percentage = 0
        num_break_w_returning = 0

    class Defense:
        aced = 0
        # t = defensive touch
        t_on_first = 0
        t_on_second = 0
        def_ts = 0
        def_t_no_return = 0

    def __init__(self, n):
        self.name = n

    def first_serve_ace(self):
        self.Offense.FirstServe.aces += 1
        self.num_breaks += 1
        self.Offense.FirstServe.on += 1

    def second_serve_ace(self):
        self.Offense.SecondServe.aces += 1
        self.num_breaks += 1
        self.Offense.SecondServe.on += 1

    def f_serve_perc(self):
        return self.Offense.FirstServe.on / self.Offense.FirstServe.total

    def s_serve_perc(self):
        return self.Offense.SecondServe.on / self.Offense.SecondServe.total

    def hit_perc(self):
        return self.Offense.hits_on / self.Offense.hits_total

    def kill_perc(self):
        return self.Offense.kills / self.Offense.hits_on
