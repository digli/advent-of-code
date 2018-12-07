use std::fs;

#[derive(Debug)]
struct Step {
    id: String,
    prerequisite_for: Vec<String>,
}

fn read_input_to_array(filename: &str) -> Vec<Box<Step>> {
    let mut steps: Vec<Box<Step>> = vec![];

    for line in fs::read_to_string(filename)
        .expect("Could not find input file")
        .lines() {
        let parts: Vec<&str> = line.split_whitespace()
            .filter(|part| part.len() == 1)
            .collect();

        let id = String::from(parts[0]);
        let prerequisite = String::from(parts[1]);

        if let Some(ref step) = steps.iter().find(|s| s.id == id) {
            step.prerequisite_for.push(prerequisite);
        } else {
            steps.push(Box::new(Step {
                id: String::from(parts[0]),
                prerequisite_for: vec![String::from(parts[1])],
            }));
        }
    }

    steps.sort_by(|a, b| a.id.cmp(&b.id));

    steps
}

fn main() {
    println!("{:?}", read_input_to_array("test_input.txt"));
}
