use std::fs;
use std::collections::{HashMap, VecDeque};

#[derive(Debug, Clone)]
struct Step {
    id: char,
    requires: Vec<char>,
}

fn work_required(id: char) -> u32 {
    (id as u8 - 'A' as u8 + 61) as u32
}

fn read_input_to_array(filename: &str) -> Vec<Step> {
    let mut steps: HashMap<char, Vec<char>> = HashMap::new();

    for line in fs::read_to_string(filename)
        .expect("Could not find input file")
        .lines() {
        let parts: Vec<char> = line.split_whitespace()
            .filter(|part| part.len() == 1)
            .map(|letter| letter.chars().next().unwrap())
            .collect();

        let id = parts[1];
        let requires = parts[0];

        steps.entry(requires).or_default();
        let step = steps.entry(id).or_default();
        step.push(requires);
    }

    steps.into_iter()
        .map(|(k, v)| Step { id: k, requires: v })
        .collect()
}

fn puzzle_one(steps: &Vec<Step>) -> String {
    let mut visited: Vec<char> = vec![];

    while steps.len() > visited.len() {
        let step = steps.iter().find(|step|
            !visited.contains(&step.id) &&
            step.requires.iter().all(|s| visited.contains(s))
        ).unwrap();

        visited.push(step.id.clone());
    }

    visited.iter().collect()
}

fn puzzle_two(steps: &Vec<Step>) -> u32 {
    let mut finished: Vec<char> = vec![];
    let mut workers: Vec<(char, u32)> = vec![];
    let mut queued = VecDeque::new();
    let mut timestamp: u32 = 0;

    while steps.len() > finished.len() {
        let mut may_start = steps.iter().filter(|step|
            !finished.contains(&step.id) &&
            !workers.iter().any(|w| w.0 == step.id) &&
            !queued.contains(&step.id) &&
            step.requires.iter().all(|s| finished.contains(s))
        ).map(|step| step.id).collect();

        queued.append(&mut may_start);

        while queued.len() > 0 && workers.len() < 5 {
            let id = queued.pop_front().unwrap();
            workers.push((id.clone(), work_required(id)));
        }

        workers = workers.iter()
            .map(|(id, remaining_work)| (id.clone(), remaining_work - 1))
            .filter(|(id, remaining_work)| {
                if *remaining_work == 0 {
                    finished.push(id.clone());
                    false
                } else {
                    true
                }
            })
            .collect();

        timestamp += 1;
    }

    timestamp
}

fn main() {
    let mut input = read_input_to_array("input.txt");
    input.sort_by(|a, b| a.id.cmp(&b.id));
    println!("The answer to puzzle 1 is {}", puzzle_one(&input));
    println!("The answer to puzzle 2 is {}", puzzle_two(&input));
}
