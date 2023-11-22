use std::collections::{HashSet, VecDeque};

fn solve(input: &str, window_size: usize) -> usize {
    let mut window = VecDeque::new();

    for (i, c) in input.chars().enumerate() {
        if window.len() < window_size {
            window.push_back(c);
            continue;
        }

        window.pop_front();
        window.push_back(c);
        let h: HashSet<char> = HashSet::from_iter(window.clone());
        if h.len() == window_size {
            return i + 1;
        }
    }
    unreachable!()
}

#[aoc(day6, part1)]
pub fn part1(input: &str) -> usize {
    solve(input, 4)
}

#[aoc(day6, part2)]
pub fn part2(input: &str) -> usize {
    solve(input, 14)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sample1() {
        assert_eq!(part1("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 7);
        assert_eq!(part1("bvwbjplbgvbhsrlpgdmjqwftvncz"), 5);
    }

    #[test]
    fn sample2() {
        assert_eq!(part2("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 19);
        assert_eq!(part2("nppdvjthqldpwncqszvftbrmjlhg"), 23);
    }
}
