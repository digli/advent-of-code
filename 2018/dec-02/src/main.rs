use std::fs;
use std::collections::HashMap;

fn read_input_to_array(filename: &str) -> Vec<String> {
    let input = fs::read_to_string(filename).expect("Input file not found");
    input.lines()
        .map(|line| String::from(line))
        .collect()
}

fn contains_exactly_n_of_any_letter(id: &str, n: u32) -> bool {
    let mut map: HashMap<char, u32> = HashMap::new();

    for letter in id.chars() {
        let count = map.entry(letter).or_insert(0);
        *count += 1;
    }

    let exact_matches: Vec<&u32> = map.values()
        .filter(|&&value| value == n)
        .collect();

    exact_matches.len() > 0
}

fn count_exact_occurances(ids: &Vec<String>, n: u32) -> i32 {
    ids.iter()
        .map(|id| contains_exactly_n_of_any_letter(id, n))
        .fold(0, |acc, val| acc + if val { 1 } else { 0 })
}

fn puzzle_one(input: &Vec<String>) -> i32 {
    count_exact_occurances(input, 2) * count_exact_occurances(input, 3)
}

fn common_letters(word1: &str, word2: &str) -> String {
    let mut result = String::new();
    let word2: Vec<char> = word2.chars().collect();

    for (index, c) in word1.chars().enumerate() {
        if c == word2[index] {
            result.push(c);
        }
    }

    result
}

fn puzzle_two(input: &Vec<String>) -> Option<String> {
    let target_length = input[0].len() - 1;
    for id in input {
        for other in input {
            let common = common_letters(&id, &other);
            if common.len() == target_length {
                return Some(common)
            }
        }
    }

    None
}

fn main() {
    let input = read_input_to_array("input.txt");

    println!("The answer to puzzle 1 is {}", puzzle_one(&input));

    match puzzle_two(&input) {
        Some(answer) => println!("The answer to puzzle 2 is {}", answer),
        None => println!("Couln't find the correct id")
    }
}
