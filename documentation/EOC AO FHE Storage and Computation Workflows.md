---
title: EOCAOFHESC
description: EOC AO FHE Storage and Computation Workflows
authors: Claoo(@Claoo), Gavianu (@gavianu)
status: Draft
date: 2024-07-08
---

# EOC AO FHE Storage and Computation Workflows

#### Version: 0.0.1

### Abstract

This document describe how EOC implements storage and computation for the information flows that should be FHE encrypted before store in the platform.
The relevant user data will be store encrypted in AO transactions messages, and the index id data to the ao transactions will be kept into a backend system.

The EOC platform aims the "clients" to publish a market study research to the target group "respondents" and collect the the study result.
A client is define as a company or individual application account that has intention to collect market insights. A respondent is an individual account that agree to participate in market studies published by the platform.
The intention of FHE storage and computation flow is that any user of the application own his data. Neither the platform or other parties could read user data unless the user choose to transfer the data via a secure channel to the party.

## Details

The actions of the actors in this floe are described by the figure 1 and figure 2.

![FHE Flow Respondent Actions](images/FHEFlowRespondentActions.png)

<center><b>Figure 1: FHE Flow Respondent Actions</b></center>

![FHE Flow Client Actions](images/FHEFlowClientActions.png)

<center><b>Figure 1: FHE Flow Client Actions</b></center>

### Generate Keys

The generate keys action is require for any user type in order to connect to a survey chart room. The process is detail in figure 3

![FHE Key Providing Process](images/FHEKeyProvidingProcess.png)

<center><b>Figure 1: FHE Key Providing Process</b></center>

## License

This repository is license under Apache License v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
