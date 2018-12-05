use std::fs;
use std::cmp;

fn read_input_to_array(filename: &str) -> Vec<char> {
    fs::read_to_string(filename)
        .expect("Could not find input file")
        .trim()
        .chars()
        .collect()
}

fn is_pair(c1: char, c2: char) -> bool {
    c1 != c2 && c1.to_lowercase().to_string() == c2.to_lowercase().to_string()
}

fn collapsed_polymer_length(units: &mut Vec<char>) -> usize {
    let mut i = 0;

    while i < units.len() - 1 {
        if is_pair(units[i], units[i + 1]) {
            units.remove(i);
            units.remove(i);

            if i > 0 {
                i -= 1;
            }
        } else {
            i += 1;
        }
    }

    units.len()
}

fn puzzle_one(units: &mut Vec<char>) -> usize {
    collapsed_polymer_length(units)
}

fn puzzle_two(units: &Vec<char>) -> usize {
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let mut min_result = units.len();

    for letter in alphabet.into_iter() {
        let uppercase_letter = letter.to_uppercase().to_string();
        let filtered_units: Vec<char> = units.iter()
            .map(|c| c.clone())
            .filter(|c| c != letter && c.to_string() != uppercase_letter)
            .collect();

        min_result = cmp::min(min_result, collapsed_polymer_length(&mut filtered_units.to_vec()));
    }

    min_result
}

fn main() {
    let units = read_input_to_array("input.txt");
    println!("The answer to puzzle 1 is {}", puzzle_one(&mut units.to_vec()));
    println!("The answer to puzzle 2 is {}", puzzle_two(&units));
}
