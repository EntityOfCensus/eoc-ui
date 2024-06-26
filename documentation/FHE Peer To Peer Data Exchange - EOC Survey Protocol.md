# FHE Peer To Peer Data Exchange - EOC Survey Protocol

#### Version: 0.0.1

### Abstract

This document outlines a protocol where each user retains ownership of their data. Users store their data on the Permaweb Arweave network, encrypted with their own Fully Homomorphic Encryption (FHE) private key. The corresponding public key, which can be used for computation, is also stored within the data block.

When a user requests a business engagement, other users involved are notified. Once a connection between the parties is established, the target data is securely transferred via a peer-to-peer (P2P) channel in plain text. The receiver then processes this data using their own FHE private key.

The roles and use cases of the EOC Survey Protocol will be detailed further in this document.

## Details

The EOC Survey Protocol describes all use cases and data exchanges involving parties participating in a market research survey. It outlines the process of reaching target group participants and collecting their feedback.

<i>Note: Reward grants are not included in this version.</i>

![FHE Peer To Peer Data Exchange](images/FHEPeerToPeerDataExchange.png)

<center><b>Figure 1: EOC Peer To Peer Data Exchange</b>  <i>Each peer owns he's data and approve's data exchange with peer user in order to engage business</i></center>
