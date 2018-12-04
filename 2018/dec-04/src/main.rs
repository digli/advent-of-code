#[macro_use] extern crate lazy_static;
extern crate regex;

use std::fs;
use regex::Regex;

#[derive(Debug)]
enum GuardEvent {
    FallsAsleep { timestamp: i32 },
    WakesUp { timestamp: i32 },
    BeginsShift { id: i32 }
}

fn parse_statement(statement: &str) -> GuardEvent {
    lazy_static! {
        static ref RE: Regex = Regex::new(
            r"[\d+-\d+-\d+ \d+:(\d{2})] (*)"
        ).unwrap();
    }

    let caps = RE.captures(statement).unwrap();
    let timestamp = caps[0].parse::<i32>().unwrap();
    let rest: [&str] = caps.get(0)
        .map_or("", |m| m.as_str())
        .split_whitespace()
        .collect();

    match rest[0].as_ref() {
        "wakes" => GuardEvent::WakesUp { timestamp },
        "falls" => GuardEvent::FallsAsleep { timestamp },
        "Guard" => {
            let id = rest[1][1..].parse::<i32>().unwrap();
            GuardEvent::BeginsShift { id }
        }
    }
}

fn read_input_to_array(filename: &str) -> Vec<String> {
    fs::read_to_string(filename)
        .expect("Couldn't read input file")
        .lines()
        .map(|line| line.into())
        .collect()
}

fn main() {
    let mut input = read_input_to_array("input.txt");
    input.sort_by(|a, b| a.cmp(b));
    println!("{:?}", input);
}
