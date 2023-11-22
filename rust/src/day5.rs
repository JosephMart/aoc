use std::str::FromStr;

#[derive(Debug)]
pub struct Command {
    count: usize,
    from: usize,
    to: usize,
}

impl FromStr for Command {
    type Err = ();
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let data: Vec<&str> = s.split_whitespace().collect();
        Ok(Command {
            count: data[1].parse().unwrap(),
            from: data[3].parse::<usize>().unwrap() - 1,
            to: data[5].parse::<usize>().unwrap() - 1,
        })
    }
}

#[aoc_generator(day5)]
pub fn input_generator(input: &str) -> (Vec<Vec<char>>, Vec<Command>) {
    let (stack_data, commands_data) = input.split_once("\n\n").unwrap();
    let mut stack_data = stack_data.lines().rev();
    let mut stacks: Vec<Vec<char>> =
        vec![Vec::new(); stack_data.next().unwrap().split_whitespace().count()];

    stack_data.for_each(|line| {
        line.as_bytes()
            .chunks(4)
            .enumerate()
            .for_each(|(i, chunk)| {
                let c = chunk[1] as char;
                if !c.is_whitespace() {
                    stacks[i].push(c);
                }
            });
    });

    (
        stacks,
        commands_data
            .lines()
            .into_iter()
            .map(|c| c.parse().unwrap())
            .collect(),
    )
}

#[aoc(day5, part1)]
pub fn part1((stacks, commands): &(Vec<Vec<char>>, Vec<Command>)) -> String {
    let mut stacks = stacks.clone();
    commands.iter().for_each(|command| {
        let l = stacks[command.from].len();
        stacks[command.from]
            .drain(l - command.count..)
            .collect::<Vec<_>>()
            .iter()
            .rev()
            .for_each(|c| stacks[command.to].push(*c));
    });
    stacks.iter().map(|a| a.last().unwrap()).collect()
}

#[aoc(day5, part2)]
pub fn part2((stacks, commands): &(Vec<Vec<char>>, Vec<Command>)) -> String {
    let mut stacks = stacks.clone();
    commands.iter().for_each(|command| {
        let l = stacks[command.from].len();
        stacks[command.from]
            .drain(l - command.count..)
            .collect::<Vec<_>>()
            .iter()
            .for_each(|c| stacks[command.to].push(*c));
    });
    stacks.iter().map(|a| a.last().unwrap()).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    static SAMPLE_VALS: &str = "    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2";

    #[test]
    fn sample1() {
        assert_eq!(part1(&input_generator(SAMPLE_VALS)), "CMZ");
    }

    #[test]
    fn sample2() {
        assert_eq!(part2(&input_generator(SAMPLE_VALS)), "MCD");
    }
}
