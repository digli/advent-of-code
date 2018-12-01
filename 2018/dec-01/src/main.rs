use std::io::prelude::*;
use std::fs::File;
use std::collections::HashSet;

fn read_input_to_array() -> Vec<i32> {
    let mut input_file = File::open("input.txt").expect("Input file not found");
    let mut input = String::new();
    input_file.read_to_string(&mut input).unwrap();
    input.lines()
        .map(|part| part.parse::<i32>().unwrap())
        .collect()
}

fn puzzle_one (input: &Vec<i32>) -> i32 {
    input.iter().fold(0, |acc, val| acc + val)
}

fn puzzle_two (input: &Vec<i32>) -> i32 {
    let mut reached_frequencies = HashSet::new();
    let mut current_frequency = 0;

    let mut i = 0;
    while !reached_frequencies.contains(&current_frequency) {
        reached_frequencies.insert(current_frequency);
        current_frequency += input[i];

        i += 1;
        if i == input.len() {
            i = 0;
        }
    }

    current_frequency
}

fn main() {
    let input = read_input_to_array();
    println!("The answer to puzzle 1 is {}", puzzle_one(&input));
    println!("The answer to puzzle 2 is {}", puzzle_two(&input));
}
