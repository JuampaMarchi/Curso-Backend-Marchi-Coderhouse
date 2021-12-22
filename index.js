import fs from 'fs'
import express from 'express'
import path, { dirname } from 'path'
import { Server } from './server/server.js'

const server = new Server;

server.webSocket()