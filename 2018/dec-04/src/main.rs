#[macro_use] extern crate lazy_static;
extern crate regex;

use std::fs;
use std::collections::HashMap;
use regex::Regex;

#[derive(Debug)]
enum GuardEvent {
    FallsAsleep { timestamp: i32 },
    WakesUp { timestamp: i32 },
    BeginsShift { id: i32 }
}

fn parse_statement_with_regex_BUT_IT_DOESNT_WORK(statement: &str) -> GuardEvent {
    // why is this so hard
    lazy_static! {
        static ref RE: Regex = Regex::new(
            r"\[\d{4}\-\d{2}\-\d{2} \d+:(\d{2})\] (.*)"
        ).unwrap();
    }

    let caps = RE.captures(statement).unwrap();
    let timestamp = caps[1].parse::<i32>().unwrap();
    let rest: Vec<&str> = caps[2].split_whitespace().collect();

    match rest[0].as_ref() {
        "wakes" => GuardEvent::WakesUp { timestamp },
        "falls" => GuardEvent::FallsAsleep { timestamp },
        "Guard" => {
            let id = rest[2][1..].parse::<i32>().unwrap();
            GuardEvent::BeginsShift { id }
        },
        _ => panic!("Cant match")
    }
}

fn parse_statement(statement: &str) -> GuardEvent {
    let timestamp = statement[15..17].parse::<i32>().unwrap();
    let event_message: Vec<&str> = statement[19..].split_whitespace().collect();

    match event_message[0].as_ref() {
        "wakes" => GuardEvent::WakesUp { timestamp },
        "falls" => GuardEvent::FallsAsleep { timestamp },
        "Guard" => {
            let id = event_message[1][1..].parse::<i32>().unwrap();
            GuardEvent::BeginsShift { id }
        },
        _ => panic!("Cant match event")
    }
}

fn read_input_to_array(filename: &str) -> Vec<String> {
    fs::read_to_string(filename)
        .expect("Couldn't read input file")
        .lines()
        .map(|line| line.into())
        .collect()
}

fn get_sleep_schedule(guard_events: Vec<GuardEvent>) -> HashMap<i32,Vec<i32>> {
    let mut active_id = 0;
    let mut fell_asleep_at = 0;
    let mut guard_sleep_patterns = HashMap::new();

    for event in guard_events.iter() {
        match event {
            GuardEvent::BeginsShift { id } => {
                active_id = *id;
            },
            GuardEvent::FallsAsleep { timestamp } => {
                fell_asleep_at = *timestamp;
            },
            GuardEvent::WakesUp { timestamp } => {
                let mut active_sleep_pattern = guard_sleep_patterns.entry(active_id)
                    .or_insert(vec![0; 60]);

                for x in fell_asleep_at..*timestamp {
                    active_sleep_pattern[x as usize] += 1;
                }
            }
        }
    }

    guard_sleep_patterns
}

fn puzzle_one(guard_sleep_patterns: &mut HashMap<i32,Vec<i32>>) -> i32 {
    let mut most_asleep_guard_id = 0;
    let mut most_asleep_time = 0;

    for (id, sleep_times) in guard_sleep_patterns.iter() {
        let sleep_time = sleep_times.into_iter()
            .fold(0, |acc, val| acc + val);
        
        if sleep_time > most_asleep_time {
            most_asleep_guard_id = *id;
            most_asleep_time = sleep_time;
        }
    }

    let sleeping_minutes = guard_sleep_patterns.entry(most_asleep_guard_id)
        .or_default()
        .into_iter()
        .enumerate();

    let mut most_asleep_minute = 0;
    let mut most_asleep_time = 0;
    for (minute, sleep_time) in sleeping_minutes {
        if *sleep_time > most_asleep_time {
            most_asleep_minute = minute as i32;
            most_asleep_time = *sleep_time as i32;
        }
    }

    most_asleep_guard_id * most_asleep_minute
}

fn puzzle_two(guard_sleep_patterns: &mut HashMap<i32,Vec<i32>>) -> i32 {
    let mut max_concurrent_sleep = 0;
    let mut max_minute = 0;
    let mut max_guard_id = 0;

    for (id, concurrent_sleep_times) in guard_sleep_patterns.into_iter() {
        for (minute, concurrent_sleep) in concurrent_sleep_times.iter().enumerate() {
            if *concurrent_sleep > max_concurrent_sleep {
                max_concurrent_sleep = *concurrent_sleep;
                max_minute = minute;
                max_guard_id = *id;
            }
        }
    }

    max_guard_id as i32 * max_minute as i32
}

fn main() {
    let mut input = read_input_to_array("input.txt");
    input.sort_by(|a, b| a.cmp(b));
    let guard_events: Vec<GuardEvent> = input.iter().map(|stmt| parse_statement(stmt)).collect();
    let mut guard_sleep_patterns = get_sleep_schedule(guard_events);
    println!("{:?}", puzzle_one(&mut guard_sleep_patterns));
    println!("{:?}", puzzle_two(&mut guard_sleep_patterns));
}
