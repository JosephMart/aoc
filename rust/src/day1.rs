#[aoc_generator(day1)]
pub fn input_generator(input: &str) -> Vec<i32> {
    let mut vals = Vec::new();
    let mut current_val = 0;

    for l in input.lines() {
        if l.eq("") {
            vals.push(current_val);
            current_val = 0;
            continue;
        }
        current_val += l.parse::<i32>().unwrap();
    }
    if current_val != 0 {
        vals.push(current_val);
    }
    return vals;
}

#[aoc(day1, part1)]
pub fn part1(vals: &[i32]) -> i32 {
    return vals.iter().fold(std::i32::MIN, |a, b| a.max(*b));
}

#[aoc(day1, part2)]
pub fn part2(vals: &[i32]) -> i32 {
    let mut v = vals.to_vec();
    v.sort_by(|a, b| b.cmp(a));
    return v[0] + v[1] + v[2];
}

#[cfg(test)]
mod tests {
    use super::*;

    static SAMPLE_VALS: &str = "1000
2000
3000

4000

5000
6000

7000
8000
9000

10000";

    #[test]
    fn sample1() {
        assert_eq!(part1(&input_generator(SAMPLE_VALS)), 24000);
    }

    #[test]
    fn sample2() {
        assert_eq!(part2(&input_generator(SAMPLE_VALS)), 45000);
    }
}
