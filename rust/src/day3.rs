use std::collections::HashMap;
use std::collections::HashSet;

fn get_priority(c: &u8) -> i32 {
    let v = i32::from(*c);
    match v {
        65..=90 => v - 64 + 26,
        97..=122 => v - 96,
        _ => unreachable!(),
    }
}

#[aoc(day3, part1)]
pub fn part1(input: &str) -> i32 {
    let mut m = HashSet::new();
    let mut result = 0;
    let mut bytes: &[u8];
    let mut mid: usize;

    for l in input.lines() {
        bytes = l.as_bytes();
        mid = bytes.len() / 2;

        for c in &bytes[..mid] {
            m.insert(c);
        }

        for c in &bytes[mid..] {
            if m.contains(c) {
                result += get_priority(c);
                break;
            }
        }
        m.clear();
    }
    result
}

#[aoc(day3, part2)]
pub fn part2(input: &str) -> i32 {
    let mut badge_set = HashMap::new();
    let mut result = 0;
    let mut badge: &[u8];

    for (i, l) in input.lines().enumerate() {
        badge = l.as_bytes();

        match i % 3 {
            0 => {
                for c in badge {
                    badge_set.insert(c, 1);
                }
            }
            1 => {
                for c in badge {
                    if badge_set.contains_key(c) {
                        badge_set.insert(c, 2);
                    }
                }
            }
            2 => {
                for c in badge {
                    match badge_set.get(c) {
                        Some(2) => {
                            result += get_priority(&c);
                            break;
                        }
                        _ => (),
                    }
                }
                badge_set.clear();
            }
            _ => unreachable!(),
        }
    }
    result
}

#[cfg(test)]
mod tests {
    use super::*;

    static SAMPLE_VALS: &str = "vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw";

    #[test]
    fn sample1() {
        assert_eq!(part1("vJrwpWtwJgWrhcsFMMfFFhFp"), 16);
        assert_eq!(part1("afZa"), 1);
        assert_eq!(part1("zfZz"), 26);
        assert_eq!(part1("AfZA"), 27);
        assert_eq!(part1("ZfZz"), 52);
    }

    #[test]
    fn sample2() {
        assert_eq!(
            part2(
                "vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg"
            ),
            18
        );

        assert_eq!(
            part2(
                "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw"
            ),
            52
        );

        assert_eq!(part2(SAMPLE_VALS), 70);
    }
}
