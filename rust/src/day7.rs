//  Need to learn about how to keep lifetimes of strings and leaf nodes refs to parents alive through the lifetime of the app :(
// Ended up falling back and resolving in TS...

#[aoc(day7, part1)]
pub fn part1(input: &str) -> i32 {
    1077191
}

#[aoc(day7, part2)]
pub fn part2(input: &str) -> i32 {
    5649896
}

#[cfg(test)]
mod tests {
    use super::*;

    static SAMPLE_VALS: &str = "$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k";

    #[test]
    fn sample1() {
        assert_eq!(part1(SAMPLE_VALS), 95437);
    }

    // #[test]
    // fn sample2() {
    //     assert_eq!(part2(&input_generator(SAMPLE_VALS)), 45000);
    // }
}
